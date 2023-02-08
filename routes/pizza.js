const express = require('express')
const fs = require('fs');
const path = require("path");

const pizza = express.Router()
const fileReaderAsync = require("../fileReader");

const pizzaPath = path.join(`${__dirname}/../pizza.json`);


pizza
	.route('/list')
	.get(async(req, res) => {
  		//const pizzasData = await fileReaderAsync(pizzaPath);
		//res.send(pizzasData.toString())


		res.render("pizza")

		// let html = "<p>My new paragraph.</p>";
		// document.getElementById("root").insertAdjacentHTML("afterend", html);

		//res.send("EDIT")



		//res.send("List of pizzas goes here");
	})

module.exports = pizza
