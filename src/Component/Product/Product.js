import React from 'react';

function Product(props){
	return(
		<div>
			<h1>{props.name}</h1>
			<p>{props.price}</p>
			<img src={props.imageURL} alt={props.imageURL} />
			<button onClick={()=>{props.deleteProduct(props.id)}}>Delete</button>
			<button onClick={()=>{props.setCurrentProduct(props.id)}}>Edit</button>
		</div>
	)
	
}

export default Product;