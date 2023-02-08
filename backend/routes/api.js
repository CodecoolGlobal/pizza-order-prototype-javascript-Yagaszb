const express = require('express')
const fs = require('fs');
const path = require("path");
const api = express.Router()

api.use('/public', express.static(`${__dirname}/../frontend/public`));

	api
	.route('/pizza')
	.get((req, res) => {
		const pizzaArray = JSON.parse(fs.readFileSync("pizza.json", "utf8"));
		res.json(pizzaArray.pizzas);
  		//res.sendFile(path.join(`${__dirname}/../../frontend/index.html`));

	})

	api
	.route('/allergen')
	.get((req, res) => {
  		const allergenArray = JSON.parse(fs.readFileSync("allergen.json", "utf8"));
		res.json(allergenArray.allergens);

  		res.sendFile(path.join(`${__dirname}/../../frontend/index.html`));
	})

	api
	.route('/order')
	.get((req, res) => {
  		const orderArray = JSON.parse(fs.readFileSync("order.json", "utf8"));
		res.json(orderArray.orders);

  		res.sendFile(path.join(`${__dirname}/../../frontend/index.html`));
	})
	.post((req, res) => {

		// fs.writeFile("order.json", JSON.stringify(order), err => {
      	// 	if (err) {
        // 		console.error(err);
      	// 	}


	})


	

module.exports = api
