import React, { Component } from 'react';
import './App.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
class AddProduct extends Component {
    constructor(){
      super();
      this.state = {
        name: "",
        price: "",
        detail: "",
        picture: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
      event.preventDefault();
  
      var data = new URLSearchParams();
      for(var property in this.state){
        var encodeKey = encodeURIComponent(property);
        var encodeValue = encodeURIComponent(this.state[property]);
        data.append(encodeKey,encodeValue);
      } 
      
      fetch('http://localhost:3001/api/addProduct', { method: 'POST', 
    
        body: data})
    
        .then(res => res.json())

        .catch(error => console.error('Error:', error))

        .then(response => console.log('Success:', response
        
        ));
        alert(data);
        this.props.history.push("/list")   
    }
     
     handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    onFileChange = event => {
      this.setState({ 
        picture: event.target.files[0].name
      })
    }
    
    
  render(){
    return (
      <div class='AddProduct'>
        <br/><br/>
        <center>
        <div class="col-md-6">
        <br/>
          <form onSubmit={this.handleSubmit}>
            <h1>Add Product</h1>
            <br/>
            <div class="col-sm-4">
              <label class="sr-only">Name</label>
              <input id="name" name="name" type="text" onChange={this.handleChange} class="form-control"/>
            </div>
            <br/>
            <div class="col-sm-2">
              <label class="sr-only">Price</label>
              <input id="price" name="price" type="text" onChange={this.handleChange} class="form-control"/>
            </div>
            <br/>
            <div class="col-sm-20">
              <label class="sr-only">Detail</label>
              <input id="detail" name="detail" type="text" onChange={this.handleChange} class="form-control"/>
            </div>
            <br/>
            <div class="col-sm-8">
              <label class="form-label" for="customFile">File input</label>
              <input id="picture" name="picture" type="file" onChange={this.onFileChange} class="form-control"/>
            </div>
            <br/>
            <button type="submit" class="btn btn-primary">
                Confirm
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" class="btn btn-dark">
              <a style={{ color: 'white', textDecoration: 'none' }}
                href='/list'>
                Cancle
              </a>
            </button> 
          </form>
          <br/>
    
          </div>
          </center>
      </div>
    );
  }
}

export default AddProduct;