import React, { Component } from 'react'
import ProductService from '../services/ProductService';

import Delete from '@material-ui/icons/Delete'; 
import EditSharpIcon from '@material-ui/icons/EditSharp';
import ViewHeadlineSharpIcon from '@material-ui/icons/ViewHeadlineSharp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Progressbar from './Progressbar';

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
        ProductService.getProducts().then((res) => {
            this.setState({ products: res.data});
        });
    }

    deleteProduct(id){
        this.setState({show:true});
        ProductService.deleteProduct(id).then( res => {
            this.setStatusAndHistory(this.state.products.filter(product => product.id !== id));
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
                                             <td className='numeric'> {product.price}</td>
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