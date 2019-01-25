require('dotenv').config();
const {json} = require('body-parser');
const express = require('express');
const massive = require('massive');

massive(process.env.CONNECTION_STRING).then(dbInstance => {
	app.set('db', dbInstance);
}).catch( err => console.log(err));

const app = express();
app.use(json());

app.get('/api/inventory', (req, res) =>{
	const db = req.app.get('db');
	db.get_inventory().then(inventory => res.status(200).json(inventory)).catch(err => console.log("error at /api/inventory",err));
})

app.post('/api/product', (req, res) =>{
	const db = req.app.get('db');
	//The fact that I', JSONing on a post may come back to bite me, check here for issues
	db.create_product([req.body.productName,req.body.price,req.body.imageURL]).then(product => res.status(200).json(product)).catch(err => console.log("error at /api/product",err));
})

app.put('/api/product/:id', (req, res) =>{
	const db = req.app.get('db');
	console.log(req.body.price);
	console.log(req.params.id);
	db.update_product([req.body.productName, req.body.price,req.body.imageURL,req.params.id]).then(product => res.status(200).json(product)).catch(err => console.log("error at put /api/product/:id",err));
})

app.delete('/api/product/:id', (req, res) =>{
	const db = req.app.get('db');
	db.delete_product([req.params.id]).then(product => res.status(200).json(product)).catch(err => console.log("error at delete /api/product:id", err));
})

app.listen(4000, console.log("listening on port 4000"));