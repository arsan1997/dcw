import React from 'react';
import './App.css';
import pic from "./image/cat.jpg";
const ProductDetail = () => {
  return (
    <div class='ProductDetail'>
        <center>
            <div class="col-md-3">
            <div class="card mb-6 box-shadow">
                    <img src={pic} />
                <div class="card-body">
                        <h5>123</h5>
                        <h4>Blue T-Shirt</h4>
                        <h5>20 Baht.</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <button type="button" class="btn btn-secondary">
                            <a style={{ color: 'white', textDecoration: 'none' }}
                            href='/list'>
                            Back
                            </a>
                        </button>
                </div>
            </div>
            </div>
        </center>
    </div>
  );
}

export default ProductDetail;