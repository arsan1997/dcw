import React, { Component } from 'react';
import Product from './Product';
class ProductList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container main-content">
        <br></br>
        <color1>
            <h2>Product List</h2>
        </color1>
        <br></br>
        <div className="col-md-2">
        <button type="button" class="btn btn-primary">
              <a style={{ color: 'white', textDecoration: 'none' }}
              href='/product/add'>
              Add
              </a>
        </button>
        </div>
        <br/>
        <div className="row product">
          <div className="col-sm product-id">
              <h6>ID</h6>
          </div>
          <div className="col-sm product-name">
              <h6>Name</h6>
          </div>
          <div className="col-sm product-price">
              <h6>Price</h6>
          </div>
          <div className="col-sm show">
          </div>
          <div className="col-sm edit">
          </div>
          <div className="col-sm delete">
          </div>
        </div>
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    );
  }
}

export default ProductList;