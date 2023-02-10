const express = require('express')
const fs = require('fs');
const path = require("path");
const api = express.Router()

	//api.use('/public', express.static(`${__dirname}/../frontend/public`));

	api
	.route('/pizza')
	.get((req, res) => {
		const pizzaArray = JSON.parse(fs.readFileSync("pizza.json", "utf8"));
		res.json(pizzaArray.pizzas);
  	})

	api
	.route('/allergen')
	.get((req, res) => {
  		const allergenArray = JSON.parse(fs.readFileSync("allergen.json", "utf8"));
		res.json(allergenArray.allergens);
	})

	api
	.route('/order')
	.get((req, res) => {
  		const orderArray = JSON.parse(fs.readFileSync("order.json", "utf8"));
		res.json(orderArray);
	})
	.post((req, res) => {
		console.log(req.body)
		try {
			fs.writeFileSync('order.json', JSON.stringify(req.body));
			res.json({"Done" : true})
			} catch (err) {
			console.error(err);
			}
	})

	// .post((req, res) => {
	// 	try {
	// 		fs.writeFileSync('order.json', JSON.stringify(req.body));
	// 		// file written successfully
	// 	  } catch (err) {
	// 		console.error(err);
	// 	  }
	// })


	

module.exports = api
