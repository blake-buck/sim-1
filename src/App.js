import React, { Component } from 'react';
import axios from 'axios';

import Dashboard from'./Component/Dashboard/Dashboard.js';
import Product from './Component/Product/Product.js';
import Form from './Component/Form/Form.js';
import Header from './Component/Header/Header.js';

import './App.css';

class App extends Component {
	
	constructor(props){
		super(props);
		this.state={
			inventoryList:[],
			currentProduct: null
		}
		this.componentDidMount = this.componentDidMount.bind(this);
		this.setCurrentProduct = this.setCurrentProduct.bind(this);
	}
	componentDidMount(){
		axios.get('/api/inventory').then( (res) =>{
			this.setState({inventoryList:res.data});
		})
	}
	
	setCurrentProduct(param){
		this.setState({currentProduct:param});
	}
	
  render() {
    return (
      <div className="App">
			<Dashboard inventoryList={this.state.inventoryList} componentDidMount={this.componentDidMount} setCurrentProduct={this.setCurrentProduct}/>
			<Form componentDidMount={this.componentDidMount} setCurrentProduct={this.setCurrentProduct} currentProduct={this.state.currentProduct}/>
			
			<button onClick={()=>console.log(this.state.currentProduct)}> Click me </button>
      </div>
    );
  }
}

export default App;
