import React from 'react';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Login from './Login';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import './App.css';
function App() {
  return (
    <div className='App'>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/list" component={ProductList} />
            <Route exact path="/product/id" component={ProductDetail} />
            <Route exact path="/product/add" component={AddProduct} />
            <Route exact path="/product/edit/id" component={EditProduct} />
          </Switch>
        </Router>
    </div>
  )
}

export default App
