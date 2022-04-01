const express = require('express')
let app = express()
let bodyParser = require('body-parser');
let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth20').Strategy;
let mysql = require('mysql');
let { createLogger, format, transports } = require('winston');
let fs = require('fs');
let path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

let env = process.env.NODE_ENV || 'development';
let logDir = 'log';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

let filename = path.join(logDir, 'results.log');

let logger = createLogger({
  level: env === 'production' ? 'info' : 'debug',
  format: format.combine(
      format.label({ label: path.basename(process.mainModule.filename) }),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  ),
  transports: [
      new transports.Console({
          format: format.combine(
              format.colorize(),
              format.printf(
                  info =>
                      `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
              )
          )
      }),
      new transports.File({
          filename,
          format: format.combine(
              format.printf(
                  info =>
                      `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
              )
          )
      })
  ]
});

passport.use(new GoogleStrategy({
    clientID:     '200824080151-f2414r869198mtrtt5gd8dm24r8j1ubh.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback   : true
  },
  function(req, accessToken, refreshToken, profile, done) {
    try {
        if (profile) {
            req.user = profile
            done(null, profile)
        }
    } catch (error) {
        logger.error('Error')
        done(error)
    }
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        session: false,
        failureRedirect: 'http://localhost:3000'
}), (req,res) => {
    let user = req.user
    res.redirect('http://localhost:3000/list')
});

// connection to mysql
let dbCon = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port : '3325',
  database: 'product_database'
})

//connect to database
dbCon.connect();

// add new data
app.post('/api/addProduct', (req, res) => {
  let name = req.body.name;
  let price = req.body.price;
  let detail = req.body.detail;
  let picture = req.body.picture;
  if (!name || !price || !detail || !picture) {
    logger.error('Please provide data.');
    res.send(false)
  } else {
    dbCon.query('INSERT INTO product (pro_name,pro_price,pro_detail,pro_picture) VALUES(?,?,?,?)', [name, price, detail, picture], (error, results, fields) => {
      if (error) throw error;
      logger.info("Add data success.");  
      res.send(true)
    })
  }
});

//get all data
app.get('/api/product', (req, res) => {
  dbCon.query('SELECT * FROM product', (error, results, fields) => {
      if (error) throw error;
      let message = ""
      if (results === undefined || results.length == 0) {
          message = "Table is emptry.";
      } else {
          message = "Show all data.";
      }
      logger.info(message);
      return res.send({ error: false, data: results, message: message })
  })
})

// get data by id
app.get('/api/product/:id', (req, res) => {
  let id = req.params.id;
  if (!id) {
    logger.error('Please provide id.');
    return res.status(400).send({ error: true, message: "Please provide id." });
  } else {
    dbCon.query("SELECT * FROM product WHERE pro_id = ?", id, (error, results, fields) => {
        if (error) throw error;
        let message = "";
        if (results === undefined || results.length == 0) {
            message = "Not found.";
        } else {
            message = "Show data by id.";
        }
        logger.info(message);
        return res.send({ error: false, data: results[0], message: message  })
    })
  }
})

// update data
app.put('/api/product/update/:id', (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let price = req.body.price;
  let detail = req.body.detail;
  let picture = req.body.picture;
  if (!id || !name || !price || !detail || !picture) {
    logger.error('Please provide data.');
    return res.status(400).send({ error: true, message: "Please provide data." });
  } else {
    dbCon.query('UPDATE product SET pro_name = ?, pro_price = ?, pro_detail = ?, pro_picture = ? WHERE pro_id = ?', [name, price, detail, picture, id], (error, results, fields) => {
        if (error) throw error;
        let message = "";
        if (results.changedRows == 0) {
            message = "Data not found or no update data.";
        } else {
            message = "Update success."
        }
        logger.info(message);
        return res.send({ error: false, data: results, message: message })
    })
  }
  
})

// delete data by id
app.delete('/api/product/delete/:id', (req, res) => {
  let id = req.params.id;
  if (!id) {
      logger.error("Please provide id of data.");
      return res.status(400).send({ error: true, message: "Please provide id." });
  } else {
      dbCon.query('DELETE FROM product WHERE pro_id = ?', [id], (error, results, fields) => {
          if (error) throw error;
          let message = "";
          if (results.affectedRows == 0) {
              message = "Data not found.";
          } else {
              message = "Delete success.";
          }
          logger.info(message);
          return res.send({ error: false, data: results, message: message })
      })
  }
})


let port = process.env.PORT || 3001;
app.listen(port, () => {
  logger.info('Listening on port ' + port);
})
module.exports = app;