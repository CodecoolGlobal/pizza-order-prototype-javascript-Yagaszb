const http = require('http');
const fs = require('fs');

const ip = "127.0.0.1";
const port = 9000;
const server = http.createServer((request, response) => {
	const pizzaArray = JSON.parse(fs.readFileSync("pizza.json", "utf8"));
	const allergenArray = JSON.parse(fs.readFileSync("allergen.json", "utf8"));
	
	if(request.url == "/" && request.method == "GET"){
		response.write(`<h1>Pizza Time</h1>`);
	}

	if(request.url == "/api/pizza" && request.method == "GET"){
		pizzaArray.pizzas.map(element => response.write(`<div>${JSON.stringify(element)}</div>`));
	}

	if(request.url == "/api/allergens" && request.method == "GET"){
		allergenArray.allergens.map(element => response.write(`<div>${JSON.stringify(element)}</div>`));
	}

	response.end();
});

server.listen(port, ip, () => {
	const addr = server.address();
	console.log(`http://${addr.address}:${addr.port}`);
});