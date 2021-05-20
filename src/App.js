import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ListProductComponent from './components/ListProductComponent';

import CreateProductComponent from './components/CreateProductComponent';
import ViewProductComponent from './components/ViewProductComponent';


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/products" className="navbar-brand">
            Products
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">Test
            </li>
          </div>
        </nav>
        <div className="container mt-3">
        <BrowserRouter>
          <Switch> 
            <Route path="/" exact component={ListProductComponent}></Route>
            <Route path="/products" component={ListProductComponent}></Route>
            <Route path="/add-product/:id" component={CreateProductComponent}></Route>
            <Route path="/view-product/:id" component={ViewProductComponent}></Route>
          </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
