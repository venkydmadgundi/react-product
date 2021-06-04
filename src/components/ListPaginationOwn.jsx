// import React, { Component } from 'react'
// import { Row, Col, Container } from 'react-bootstrap';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import ProductPagination from './ProductPagination';
// import 'bootstrap/dist/css/bootstrap.css';

// import ProductService from '../services/ProductService';

// import Delete from '@material-ui/icons/Delete'; 
// import EditSharpIcon from '@material-ui/icons/EditSharp';
// import ViewHeadlineSharpIcon from '@material-ui/icons/ViewHeadlineSharp';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import Progressbar from './Progressbar';

// const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/products/";

// const pageNumbers = [];

// class ListProductComponent extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//                 products: [],
//                 show: false,
//                 total: null,
//                 per_page: 5,
//                 current_page: 1,
//         }
//         this.addProduct = this.addProduct.bind(this);
//         this.editProduct = this.editProduct.bind(this);
//         this.deleteProduct = this.deleteProduct.bind(this);
//     }

//     componentDidMount(){
//         // fetch(PRODUCT_API_BASE_URL, {
//         //   method: 'GET'
//         // })
//         // .then(response => response.json())
//         // .then(result => {
//         //     this.setState({ products: result});
//         // })
//         // .catch(error => {
//         //     console.error('Error:', error);
//         // });
//         this.makeHttpRequestWithPage(1);
//     }

//     makeHttpRequestWithPage = async pageNumber => {
//     const response = await fetch(PRODUCT_API_BASE_URL +`?page=${pageNumber}&size=${this.state.per_page}`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await response.json();

//     this.setState({
//       products: data['productList'],
//       total: data['totalCount'],
//       per_page: data['numberPage'],
//       current_page: pageNumber
//     });
//   }

//     onPageHandler = async (type, {  
//         page  
//     }) => {
//         this.makeHttpRequestWithPage(page);
//     }


//     deleteProduct(id){
//         this.setState({show:true});
//         fetch(PRODUCT_API_BASE_URL + id, {
//           method: 'DELETE'
//         })
//         .then(response => response.json())
//         .then(result => {
//             this.setStatusAndHistory(this.state.products.filter(product => product.id !== id));
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     }

//     setStatusAndHistory(products){
//         setTimeout(()=> {
//             this.setState({show:false});
//             this.setState({products: products});
//         }, 2000); 
//     }

//     viewProduct(id){
//         this.props.history.push(`/view-product/${id}`);
//     }

//     editProduct(id){
//         this.props.history.push(`/add-product/${id}`);
//     }

//     addProduct(){
//         this.props.history.push('/add-product/_add');
//     }


//     render() {

//         ///Column Style  
//         const colStyle = {  
//             backgroundColor: '#002b48',  
//             color: "#ffffff",  
//             width: '60px'  
//         }  
//         //Generate column  
//         const columns = [{  
//             dataField: 'id',  
//             text: 'Id',  
//             headerStyle: colStyle  
//         }, {  
//             dataField: 'name',  
//             text: 'Name',  
//             headerStyle: colStyle  
//         }, {  
//             dataField: 'description',  
//             text: 'Description',  
//             headerStyle: colStyle  
//         }, { 
//             dataField: 'price',  
//             text: 'Price',  
//             headerStyle: colStyle  
//         }, {  
//             dataField: 'stock',  
//             text: 'stock',  
//             headerStyle: colStyle  
//         }];

//         const {data  } = this.state;



//         var url = "https://stackblitz.com/files/react-spinner-sample/github/RahmanM/react-spinner-sample/master/loading.gif";
//         return (
//             < React.Fragment > < Container > < Row > < Col > < h2 > Pagination Demo in React < /h2></Col > < /Row> < Row > < Col xs = {  
//                 3  
//             } > < /Col> < Col xs = {  
//                 6  
//             } > < ProductPagination data = {  
//                 this.state.products  
//             }  
//             page = {  
//                 this.state.current_page  
//             }  
//             sizePerPage = {  
//                 this.state.per_page || 5 
//             }  
//             totalSize = {  
//                 this.state.totalCount  
//             }  
//             onTableChange = {  
//                 this.onPageHandler 
//             }  
//             columns = {  
//                 columns  
//             }  
//             /> < /Col> < Col xs = {  
//                 3  
//             } > < /Col> < /Row> < /Container> < /React.Fragment>
//         )
//     }
// }

// export default ListProductComponent;