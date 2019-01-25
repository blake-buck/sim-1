import React,{Component} from 'react';
import Product from '../Product/Product.js';
import axios from 'axios';

class Dashboard extends Component{
	
	constructor(props){
		super(props);
		
		this.deleteProduct = this.deleteProduct.bind(this);
	}
	
	deleteProduct(id){
		console.log(id);
		axios.delete(`/api/product/${id}`).then( (res) => {
			this.props.componentDidMount();
		})
	}
	
	render(){
		return(
			<div>
			{
				this.props.inventoryList.map( (val, i) => {
					return(		
						<Product key={i} name={val.name} price={val.price} imageURL={val.imageurl} deleteProduct={this.deleteProduct} id={val.id} 
						position={i} setCurrentProduct={this.props.setCurrentProduct}
						/>
					)
				})
			}
			</div>
		)
	}
	
}

export default Dashboard;