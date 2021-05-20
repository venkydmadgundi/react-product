import React, { Component } from 'react'
import ProductService from '../services/ProductService';

import Delete from '@material-ui/icons/Delete'; 
import EditSharpIcon from '@material-ui/icons/EditSharp';
import ViewHeadlineSharpIcon from '@material-ui/icons/ViewHeadlineSharp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Spinner from "./Spinner";

class ListProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                products: [],
                loading: true
        }
        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.onLoadTables = this.onLoadTables.bind(this);
    }

    onLoadTables() {
        this.setState({
          users: [],
          posts: [],
        });
        ProductService.getProducts().then((res) => {
            this.setState({ products: res.data, loading: false});
        });
    }

    componentDidMount(){
        ProductService.getProducts().then((res) => {
            this.setState({ products: res.data, loading: false});
        });
    }

    deleteProduct(id){
        ProductService.deleteProduct(id).then( res => {
            this.setState({products: this.state.products.filter(product => product.id !== id)});
        });
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
            const renderCompoent = <div>
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
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.products.map(
                                        product => 
                                        <tr key = {product.id}>
                                             <td> {product.name} </td>   
                                             <td> {product.description}</td>
                                             <td> {product.price}</td>
                                             <td> {product.stock}</td>
                                             <td>
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
        return (this.state.loading ? <Spinner /> : renderCompoent )
    }
}

export default ListProductComponent;