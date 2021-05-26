import React, { Component } from 'react'
import ProductService from '../services/ProductService';

import Delete from '@material-ui/icons/Delete'; 
import EditSharpIcon from '@material-ui/icons/EditSharp';
import ViewHeadlineSharpIcon from '@material-ui/icons/ViewHeadlineSharp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Progressbar from './Progressbar';

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/products/";

class ListProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                products: [],
                show: false
        }
        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount(){
        fetch(PRODUCT_API_BASE_URL, {
          method: 'GET'
        })
        .then(response => response.json())
        .then(result => {
            this.setState({ products: result});
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    deleteProduct(id){
        this.setState({show:true});
        fetch(PRODUCT_API_BASE_URL + id, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            this.setStatusAndHistory(this.state.products.filter(product => product.id !== id));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    setStatusAndHistory(products){
        setTimeout(()=> {
            this.setState({show:false});
            this.setState({products: products});
        }, 2000); 
    }

    viewProduct(id){
        this.props.history.push(`/view-product/${id}`);
    }

    editProduct(id){
        this.props.history.push(`/add-product/${id}`);
    }

    addProduct(){
        this.props.history.push('/add-product/_add');
    }

    render() {
        var url = "https://stackblitz.com/files/react-spinner-sample/github/RahmanM/react-spinner-sample/master/loading.gif";
        return (
            <div>
            <Progressbar show={this.state.show} imageUrl={url} height="90" width="90" alignment="middle" alttext="Loading..." />
                 <h2 className="text-center">Product List</h2>
                 <div className = "row">
                    <div class="col-4">
                        <button className="btn btn-primary" onClick={this.addProduct}> <AddCircleOutlineIcon/> Add</button>
                    </div>
                 </div>

                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th className='action'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.products.map(
                                        product => 
                                        <tr key = {product.id}>
                                             <td> {product.name} </td>   
                                             <td> {product.description}</td>
                                             <td className='numeric'> {product.price.toFixed(2)}</td>
                                             <td className='numeric'> {product.stock}</td>
                                             <td className='action'>
                                                 <button onClick={ () => this.editProduct(product.id)} className="btn btn-info"><EditSharpIcon/> </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteProduct(product.id)} className="btn btn-danger"><Delete /> </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewProduct(product.id)} className="btn btn-info"><ViewHeadlineSharpIcon/> </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                 </div>
            </div>
        )
    }
}

export default ListProductComponent;