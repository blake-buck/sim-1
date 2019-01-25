import React, {Component} from 'react';
import axios from 'axios';

class Form extends Component{
	constructor(props){
		super(props);
		this.state={
			imageURL:"",
			productName:"",
			price:0, 
			currentProduct:this.props.currentProduct
		}
		
		
	}
	componentDidUpdate(prevProps, prevState){
		if(prevProps !== this.props){
			if(this.props.currentProduct){
				this.setState({
					currentProduct:this.props.currentProduct.id, 
					imageURL:this.props.currentProduct.imageurl,
					productName:this.props.currentProduct.name,
					price:this.props.currentProduct.price
				});
			}
		}
	}
	
	handleChange(e, id){
		this.setState({[id]:e.target.value});
	}
	
	cancel(){
		this.setState({imageURL:"", productName:"", price:0, currentProduct:null});
	}
	addToInventory(){
		var {imageURL, productName, price} = this.state;
		
		axios.post('/api/product', {imageURL, productName, price}).then( (res) =>{
			this.props.componentDidMount();
			this.cancel();
		})
		
	}
	
	update(){
		var {imageURL, productName, price} = this.state;
		console.log(this.state.currentProduct);
		axios.put(`/api/product/${this.state.currentProduct}`, {productName, price, imageURL}).then( (res) => {
			console.log(price);
			this.props.componentDidMount();
			this.props.setCurrentProduct(null, null);
			this.cancel();
		})
	}
	
	render(){
		var {imageURL, productName, price} = this.state;
		return(
			<div>
				<input type="text" placeholder="image url" value={imageURL} onChange={(e)=>this.handleChange(e, "imageURL")}/>
				<input type="text" placeholder="product name" value={productName} onChange={(e)=>this.handleChange(e, "productName")}/>
				<input type="number" placeholder="price" value={price} onChange={(e)=>this.handleChange(e, "price")}/>
				<button onClick={()=>this.cancel()}>Cancel</button>
					{
						this.state.currentProduct ? (<button onClick={()=>this.update()}>Save Changes</button>):
						(<button onClick={()=>this.addToInventory()}>Add to Inventory</button>)
						
					}
			</div>
		)
	}
	
}

export default Form;