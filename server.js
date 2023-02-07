const express = require("express");
const path = require("path");
const fs = require('fs');
const cors = require("cors");

const app = express();
const pizzaArray = JSON.parse(fs.readFileSync("pizza.json", "utf8"));
const allergenArray = JSON.parse(fs.readFileSync("allergen.json", "utf8"));

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));

app.set('views', path.join(`${__dirname}/views`));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
	res.render("index")
})

const apiRouter = require('./routes/api')
const pizzaRouter = require('./routes/pizza')

app.use('/api', apiRouter);
app.use('/pizza', pizzaRouter);




app.listen(3000)
