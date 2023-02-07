const express = require('express')
const fs = require('fs');
const path = require("path");

const api = express.Router()
const fileReaderAsync = require("../fileReader");

const pizzaPath = path.join(`${__dirname}/../pizza.json`);
const allergenPath = path.join(`${__dirname}/../allergen.json`);
const orderPath = path.join(`${__dirname}/../order.json`);

api
	.route('/pizza')
	.get(async(req, res) => {
  		const pizzasData = await fileReaderAsync(pizzaPath);
		res.send(pizzasData.toString())
	})

api
	.route('/allergens')
	.get(async(req, res) => {
  		const allergensData = await fileReaderAsync(allergenPath);
		res.send(allergensData.toString())
	})

api
	.route('/order')
	.get(async(req, res) => {
  		const ordersData = await fileReaderAsync(orderPath);
		res.send(ordersData.toString())
	})
	.post((req, res) => {

	})

module.exports = api
