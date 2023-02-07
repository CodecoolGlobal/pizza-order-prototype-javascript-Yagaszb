const express = require('express')
const fs = require('fs');
const path = require("path");

const api = express.Router()
const fileReaderAsync = require("../fileReader");

const pizzaPath = path.join(`${__dirname}/../pizza.json`);
const allergenPath = path.join(`${__dirname}/../allergen.json`);

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

module.exports = api