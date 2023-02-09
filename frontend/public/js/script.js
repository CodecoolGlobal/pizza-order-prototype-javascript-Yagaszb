let root =document.querySelector("#root"), orderbasketarray=[], allergens_filter = document.querySelector("#allergens_filter"), allergenClass = "", ingredientClass="", pizzasArray = [], basketArray = [];

let buildHTML = function(){
	root.insertAdjacentHTML("afterbegin", '<div class="container-flex"><div class="row m-0 p-0"><div class="col-12 text-center p-0 hero"><h1>Pizza Time</h1></div></div></div><div class="container"><div class="row m-0 p-0"><div class="col-12"><span class="filter_text">Filter by Allergens: </span><select name="filter" id="allergens_filter"><option></option></select></div></div><div class="row p-0 m-0" id="pizza_container"></div></div><div class="greybg d-none" id="greybg"></div><div class="basket d-none" id="basket"><h3>Basket</h3><span class="close_basket" onclick="closeBasket()">X</span><div class="basket_content" id="basket_content"><div><div class="ordered_pizza"><h4>Your pizzas</h4><div id="ordered_pizza"></div></div><div class="user_form" id="user_form"><h4>Your details</h4><input name="name" type="text" placeholder="Name" id="inputName"><input name="email" type="email" placeholder="Email" id="inputEmail"><input name="city" type="text" placeholder="City" id="inputCity"><input name="address" type="text" placeholder="Address" id="inputAddress"><div class="formatted_button submit_button" id="submit" onclick="test()">Submit</div></div></div></div>');
}

let getPizzas = function () { return fetch("/api/pizza").then(res =>res.json()) }

let showPizzas = (pizzas) => {
	//pizzasArray = pizzas;
	pizzas.map(pizza => (
		createPizzasAllergenList(pizza),
		createPizzasIngredientsList(pizza),
		document.querySelector('#pizza_container').insertAdjacentHTML('beforeend',`<div class="col-md-6 col-lg-3${allergenClass} pizzabox"><div class="pizza"><div class="pic text-center"><img src="/public/img/${pizza.img}" class="w-75"></div><div class="name" id="pizza_name">${pizza.name}<hr></div><div class="ingredients">Filling: ${ingredientClass}</div><div class="price">${pizza.price} Ft.-</div><div class="quantity"><span class="circle_sign plus_sign" onclick="addQuantity(event)">+</span> <span class="quantity_value" id="quantity-${pizza.id}">1</span> <span class="circle_sign minus_sign" onclick="reduceQuantity(event)">-</span></div><div class="button"><div class="formatted_button order_pizza" id="orderbutton-${pizza.id}" data-id="${pizza.id}" onclick="orderSinglePizza(event)">Order</div></div></div></div>`),
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

let closeBasket = () =>{
	document.querySelector("#greybg").classList.add("d-none");
	document.querySelector("#basket").classList.add("d-none");
	}

let orderSinglePizza = (e) => {
	document.querySelector("#greybg").classList.remove("d-none")
	document.querySelector("#basket").classList.remove("d-none")
	let buttonID = document.getElementById(e.target.id)
	let pizzaID = e.target.id.replace('orderbutton-','')
	let pizzaName = buttonID.closest("div").parentElement.parentElement.querySelector("#pizza_name").innerText
	let quantityVal = buttonID.closest("div").parentElement.previousSibling.querySelector("#quantity-"+pizzaID).innerHTML
	basketArray.push({"id": parseInt(pizzaID), "name":pizzaName, "amount": parseInt(quantityVal)})
	orderbasketarray.push({"id": parseInt(pizzaID),"amount": parseInt(quantityVal)})
	console.log(basketArray);
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
	basketArray.map(pizza => document.querySelector('#ordered_pizza').insertAdjacentHTML('beforeend',`<div><span>${pizza.name}</span><span>${pizza.amount} db</span></div>`));
}

// let submitOrder = async (obj) =>{
// 	const res = await fetch("/api/order");
// 	return await res.json();
// }
let obj={}
async function submitOrder(obj) {
	console.log("hello world: "+document.getElementById("inputCity").value)
	try{
  
	  const response = await fetch('http://127.0.0.1:9002/api/order', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(obj)
	  })
  
	  const data = await response.json();
	  //console.log("hello world: "+document.getElementById("inputCity"))
	  return data;
	}
	catch(error){
	  const errorMessage = await error.json()
	  return errorMessage
	}
  }
let test= () =>{
	obj=
				{
					"id": 1,
					"pizzas" : 
					orderbasketarray,
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
				  console.log(obj)
				  submitOrder(obj)
				  
			}
const loadEvent = _ => {
	buildHTML();

	getAllergens()
		.then(allergens => showAllergens(allergens))

	getPizzas()
		.then(pizzas => showPizzas(pizzas))
		let submitDataOnClick = () =>{
			// let obj={				"name": document.getElementById("inputName").value,
			// "email": document.getElementById("inputEmail").value,
			// "city": document.getElementById("inputCity").value,
			//   "street": document.getElementById("inputAddress").value}
			  //return obj
			  console.log("itt vagyok: "+document.getElementById("inputEmail").value)
		}
		let order = () => {
			let obj=
				{
					"id": basketArray[0],
					"pizzas" : 
					[{"id": basketArray[0], "amount": basketArray[1]}],
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
				  return obj
			}
			console.log("hello world: "+document.getElementById("inputCity").value)
			
			  submitOrder(obj)
	document.querySelector("#allergens_filter").addEventListener('change', hidePizzas);	
	document.getElementById("submit").addEventListener("click", submitDataOnClick())
	document.getElementById("submit").addEventListener("click", submitOrder(order()))



// let fetchURL = "/api/order";

// let fetchNasa = (fetchURL) =>{
// 	fetch(fetchURL)
//		method: "POST"
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
