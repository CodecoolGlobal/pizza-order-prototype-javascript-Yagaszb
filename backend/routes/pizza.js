const express = require('express')
const fs = require('fs');
const path = require("path");

const pizza = express.Router()

pizza
	.route('/list')
	.get(async(req, res) => {
  		const pizzaArray = JSON.parse(fs.readFileSync("pizza.json", "utf8"));
		res.json(pizzaArray.pizzas);

  		//res.sendFile(path.join(`${__dirname}/../../frontend/index.html`));
	})
	.post(async(req, res) => {

	})

module.exports = pizza