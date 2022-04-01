import React from 'react';
import './App.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const Product = () => {

    const submit = () => {
        confirmAlert({
            title: 'Delete!!!',
            message: 'Are you sure to delete ?',
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
        <div className="row product">
            <div className="col-sm product-id">
                <h6>123</h6>
            </div>
            <div className="col-sm product-name">
                <h6>Blue T-Shirt</h6>
            </div>
            <div className="col-sm product-price">
                <h6>20 Baht.</h6>
            </div>
            <div className="col-sm show">
                <button type="button" class="btn btn-secondary">
                    <a style={{ color: 'white', textDecoration: 'none' }}
                        href='/product/id'>
                        Show
                    </a>
                </button>
            </div>
            <div className="col-sm edit">
                <button type="button" class="btn btn-success">
                    <a style={{ color: 'white', textDecoration: 'none' }}
                        href='/product/edit/id'>
                        Edit
                    </a>
                </button>
            </div>
            <div className="col-sm delete">
                <button type="button" class="btn btn-danger" onClick={submit}>
                    Delete
                </button>
                
            </div>
        </div>
    );
}

export default Product;