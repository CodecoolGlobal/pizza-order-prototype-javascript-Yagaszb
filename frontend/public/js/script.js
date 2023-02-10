let root = document.querySelector("#root"), allergens_filter = document.querySelector("#allergens_filter"), allergenClass = "", ingredientClass="", basketArray = [], orderBasketArray=[], finalObj={};

let buildHTML = function(){
	root.insertAdjacentHTML("afterbegin", '<div class="container-flex"><div class="row m-0 p-0"><div class="col-12 text-center p-0 hero"><h1>Pizza Time</h1></div></div></div><div class="container"><div class="row m-0 p-0"><div class="col-12"><div class="row m-0 p-0"><div class="col-10"><span class="filter_text">Filter by Allergens: </span><select name="filter" id="allergens_filter"><option></option></select></div><div class="col-2 text-end"><img src="/public/img/basket.png" class="basket_icon" onclick="openBasket()"></div></div></div><div class="row p-0 m-0" id="pizza_container"></div></div><div class="greybg d-none" id="greybg"></div><div class="basket d-none" id="basket"><h3>Basket</h3><span class="close_basket" onclick="closeBasket()">X</span><div id="basket_empty" class="message text-center">Your Basket is empty!</div><div id="thank-you" class="message text-center d-none">Thank you for your order!</div><div class="basket_content d-none" id="basket_content"><div class="basket-container" id="basket-container"><div class="ordered_pizza"><h4>Your pizzas <hr class="h4_hr"></h4><div id="ordered_pizza"></div></div><div class="user_form" id="user_form"><h4>Your details <hr class="h4_hr"></h4><input name="name" type="text" placeholder="Name" id="inputName"><input name="email" type="email" placeholder="Email" id="inputEmail"><input name="city" type="text" placeholder="City" id="inputCity"><input name="address" type="text" placeholder="Address" id="inputAddress"><div class="formatted_button submit_button" onClick="createOrderArray()">Submit</div></div></div></div>');
}

let getPizzas = function () { return fetch("/api/pizza").then(res =>res.json()) }

let showPizzas = (pizzas) => {
	pizzas.map(pizza => (
		createPizzasAllergenList(pizza),
		createPizzasIngredientsList(pizza),
		document.querySelector('#pizza_container').insertAdjacentHTML('beforeend',`<div class="col-md-6 col-lg-4 col-xl-3${allergenClass} pizzabox"><div class="pizza"><div class="pic text-center"><img src="/public/img/${pizza.img}" class="w-75"></div><div class="name" id="pizza_name">${pizza.name}<hr></div><div class="ingredients">Filling: ${ingredientClass}</div><div class="price">${pizza.price} Ft.-</div><div class="quantity"><span class="circle_sign plus_sign" onclick="addQuantity(event)">+</span> <span class="quantity_value" id="quantity-${pizza.id}">1</span> <span class="circle_sign minus_sign" onclick="reduceQuantity(event)">-</span></div><div class="button"><div class="formatted_button order_pizza" id="orderbutton-${pizza.id}" data-id="${pizza.id}" onclick="addSinglePizzaToBasket(event)">Basket</div></div></div></div>`),
		allergenClass = "",
		ingredientClass=""

		));
	}

let getAllergens = function () { return fetch("/api/allergen").then(res =>res.json()) }

let showAllergens = (allergens) => {
	allergens.map(allergens => document.querySelector('#allergens_filter').insertAdjacentHTML('beforeend',`<option value="${allergens.id}">${allergens.name}</option>`) );
	}

let createPizzasAllergenList = (pizza) => {
	for(allergen of pizza.allergens){ allergenClass += " " + allergen; }
	}

let createPizzasIngredientsList = (pizza) => {
	for(ingredient of pizza.ingredients){ ingredientClass += ingredient  + ", "; }
	}

let hidePizzas = (e) => {
	let allergen = event.target.value;
	var pizzabox = document.getElementsByClassName("pizzabox");
	
	for (var i = 0; i < pizzabox.length; i++) {
		
		if(allergen)
			{
			if( pizzabox[i].classList.contains(allergen) )
		   		{
		   		pizzabox[i].classList.add('d-none');
		   		}
		   	else{
		   		pizzabox[i].classList.remove('d-none');
		   		}
		   	}
		else{
			pizzabox[i].classList.remove('d-none');
			}
		}
	}

let openBasket = () =>{
	document.querySelector("#greybg").classList.remove("d-none")
	document.querySelector("#basket").classList.remove("d-none")
	document.body.classList.add('overflow-hidden')
	}

let closeBasket = () =>{
	document.querySelector("#greybg").classList.add("d-none");
	document.querySelector("#basket").classList.add("d-none");
	document.body.classList.remove('overflow-hidden')
	}

let addSinglePizzaToBasket = (e) => {
	document.getElementById("basket_empty").classList.add('d-none');
	document.getElementById("basket_content").classList.remove('d-none');
	openBasket();
	let buttonID = document.getElementById(e.target.id)
	let pizzaID = e.target.id.replace('orderbutton-','')
	let pizzaName = buttonID.closest("div").parentElement.parentElement.querySelector("#pizza_name").innerText
	let quantityVal = buttonID.closest("div").parentElement.previousSibling.querySelector("#quantity-"+pizzaID).innerHTML
	basketArray.push({"id": parseInt(pizzaID), "name":pizzaName, "amount": parseInt(quantityVal)})
	orderBasketArray.push({"id": parseInt(pizzaID),"amount": parseInt(quantityVal)})
	contentOfBasket(basketArray)
}

let addQuantity = (e) =>{
	let quantityVal = document.getElementById(e.target.nextSibling.nextSibling.id);
	quantityVal.innerHTML = parseInt(quantityVal.innerHTML) +1;
}

let reduceQuantity = (e) =>{
	let quantityVal = document.getElementById(e.target.previousSibling.previousSibling.id);
	quantityVal.innerHTML > 0 ? quantityVal.innerHTML = parseInt(quantityVal.innerHTML) - 1 : null;
}

let contentOfBasket = (basketArray) => {
	document.querySelector('#ordered_pizza').innerHTML = "";
	basketArray.map(pizza => document.querySelector('#ordered_pizza').insertAdjacentHTML('beforeend',`<div class="position-relative"><span>${pizza.name}</span><span>${pizza.amount} db</span></div>`));
}

let createOrderArray = () =>{
	finalObj=
		{
		"id": 1,
		"pizzas" : orderBasketArray,
		"date": {
			"year": (new Date).getFullYear,
			"month": (new Date).getMonth,
			"day": (new Date).toDateString().split(" ")[2],
			"hour": (new Date).getHours(),
			"minute": (new Date).getMinutes()
			},
		"customer": {
			"name": document.getElementById("inputEmail").value,
			"email": document.getElementById("inputEmail").value,
			"address": {
				"city": document.getElementById("inputCity").value,
				"street": document.getElementById("inputAddress").value
			}
		}
	}

	submitOrder(finalObj)
	document.getElementById("basket-container").classList.add('d-none')
	document.getElementById("thank-you").classList.remove('d-none')
	finalObj={}
	}

async function submitOrder(finalObj) {
	try{
		const response = await fetch('http://127.0.0.1:9002/api/order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				},
			body: JSON.stringify(finalObj)
			})

		const data = await response.json();
		return data;
		}
	catch(error){
		const errorMessage = await error.json()
		return errorMessage
		}
	}

const loadEvent = _ => {
	buildHTML();

	getAllergens()
		.then(allergens => showAllergens(allergens))

	getPizzas()
		.then(pizzas => showPizzas(pizzas))

	document.querySelector("#allergens_filter").addEventListener('change', hidePizzas)
};

window.addEventListener("load", loadEvent);
