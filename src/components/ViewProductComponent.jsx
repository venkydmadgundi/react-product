import React, { Component } from 'react'
import ProductService from '../services/ProductService'

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/products/";

class ViewProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            product: {}
        }
    }

    componentDidMount(){
        fetch(PRODUCT_API_BASE_URL + this.state.id, {
          method: 'GET'
        })
        .then(response => response.json())
        .then(result => {
            this.setState({ product: result});
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Product Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label>Name: </label>
                            <div> { this.state.product.name }</div>
                        </div>
                        <div className = "row">
                            <label>Description: </label>
                            <div> { this.state.product.description }</div>
                        </div>
                        <div className = "row">
                            <label> Price: </label>
                            <div> { this.state.product.price }</div>
                        </div>
                        <div className = "row">
                            <label> Stock: </label>
                            <div> { this.state.product.stock }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewProductComponent