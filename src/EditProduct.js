import React from 'react';
import './App.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const EditProduct = () => {
    const submit = () => {
      confirmAlert({
          title: 'Edit Product',
          message: 'Are you sure to edit this product ?',
          buttons: [
          {
              label: 'Yes',
              onClick: () => alert('Click Yes')
          },
          {
              label: 'No',
              onClick: () => alert('Click No')
          }
          ]
      });
  }
  return (
    <div class='EditProduct'>
      <br/><br/>
      <center>
      <div class="col-md-6">
      <br/>
        <form class="form-signin">
          <h1>Edit Product</h1>
          <br/>
          <div class="col-sm-4">
            <label class="sr-only">Name</label>
            <input id="inputName" class="form-control" required/>
          </div>
          <br/>
          <div class="col-sm-2">
            <label class="sr-only">Price</label>
            <input id="inputPrice" class="form-control" required/>
          </div>
          <br/>
          <div class="col-sm-20">
            <label class="sr-only">Detail</label>
            <input id="inputDetail" class="form-control input-lg" required/>
          </div>
          <br/>
          <div class="col-sm-8">
            <label class="form-label" for="customFile">File input</label>
            <input type="file" class="form-control" id="customFile" />
          </div>
          <br/>
          <button type="button" class="btn btn-primary" onClick={submit}>
            <a style={{ color: 'white', textDecoration: 'none' }}
              href='/list'>
              Confirm
            </a>
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

export default EditProduct;