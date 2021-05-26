import React, { Component } from 'react'
import ProductService from '../services/ProductService';
import SaveSharpIcon from '@material-ui/icons/SaveSharp';
import CancelSharpIcon from '@material-ui/icons/CancelSharp';
import Progressbar from './Progressbar'

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/products/";

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            description: '',
            price: '',
            stock: '',
            show: false
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            fetch(PRODUCT_API_BASE_URL + this.state.id, {
              method: 'GET'
            })
            .then(response => response.json())
            .then(result => {
                let product = result;
                this.setState({name: product.name,
                    description: product.description,
                    price : product.price,
                    stock : product.stock
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
            }
    }

    saveOrUpdateProduct = (e) => {
        this.setState({show:true});

        e.preventDefault();
        let product = {name: this.state.name, description: this.state.description, price: this.state.price, stock: this.state.stock };
        console.log('product => ' + JSON.stringify(product));

        // step 5
        if(this.state.id === '_add'){
            fetch((PRODUCT_API_BASE_URL ), {
              method: 'POST',
              body: JSON.stringify(product),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
            })
            .then(this._checkStatus)
            .then(this._parseJSON)
            .then(this.setStatusAndHistory());
        }else{
            fetch((PRODUCT_API_BASE_URL + this.state.id ), {
              method: 'PUT',
              body: JSON.stringify(product),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
            })
            .then(this._checkStatus)
            .then(this._parseJSON)
            .then(this.setStatusAndHistory());
        } 
    }

    setStatusAndHistory(){
        setTimeout(()=> { 
                    this.setState({show:false});
                    this.props.history.push('/products');
                }, 2000); 
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }

    changeStockHandler= (event) => {
        this.setState({stock: event.target.value});
    }

    cancel(){
        this.props.history.push('/products');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Product</h3>
        }else{
            return <h3 className="text-center">Update Product</h3>
        }
    }
    render() {
        var url = "https://stackblitz.com/files/react-spinner-sample/github/RahmanM/react-spinner-sample/master/loading.gif";
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <Progressbar show={this.state.show} imageUrl={url} height="90" width="90" alignment="middle" alttext="Loading..." />
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Description: </label>
                                            <input placeholder="Description" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changePriceHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Stock: </label>
                                            <input placeholder="Stock" name="stock" className="form-control" 
                                                value={this.state.stock} onChange={this.changeStockHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateProduct}><SaveSharpIcon/></button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}><CancelSharpIcon/></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                   </div>
            </div>
        )
    }
}

export default CreateProductComponent