let root = document.querySelector("#root");

let buildHTML = function(){
	root.insertAdjacentHTML("afterbegin", '<div class="container"><div class="row m-0 p-0"><div class="col-12 text-center"><h1>Pizza Time</h1></div></div><div class="row m-0 p-0"><div class="col-12"><span>Filter by: </span><select name="filter" id="filter"></select></div></div><div class="row m-0 p-0" id="pizza_container"></div></div>');
}



let pizzaFetch = function () { return fetch("/api/pizza").then(res =>res.json()) }

let showPizzas = (pizzas) => {
	pizzas.map(pizza => document.querySelector('#pizza_container').insertAdjacentHTML('beforeend',`<div class="col-3"><div class="pizza"><div class="pic"><img src="/public/img/${pizza.img}" class="mw-100"></div><div class="name">${pizza.name}</div><div class="ingredients">${pizza.ingredients}</div><div class="allergens">${pizza.allergens}</div><div class="price">${pizza.price}</div><div class="quantity"><span class="plus_sign">+</span><span class="quantity_value">1</span><span class="minus_sign">-</span></div><div class="button"><div class="order_pizza">Order</div></div></div></div>`) );
		//console.log(pizza)
	//console.log(pizzas);
}





const loadEvent = _ => {
	buildHTML();



	pizzaFetch()
		.then(pizzas => showPizzas(pizzas))


// let fetchURL = "/api/pizza";

// let fetchNasa = (fetchURL) =>{
// 	fetch(fetchURL)
// 		.then(function(response) {
// 			return response.json();
// 			})
// 		.then((data) => {
// 			let datas = data;

// 			console.log(datas);
// 			})
// 		.catch(function(error) {
// 			});
// 	}

// fetchNasa(fetchURL);





};

window.addEventListener("load", loadEvent);
