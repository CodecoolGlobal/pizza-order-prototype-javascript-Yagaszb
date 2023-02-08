let root = document.querySelector("#root"), allergens_filter = document.querySelector("#allergens_filter"), allergenClass = "", ingredientClass="";

let buildHTML = function(){
	root.insertAdjacentHTML("afterbegin", '<div class="container-flex"><div class="row m-0 p-0"><div class="col-12 text-center p-0 hero"><h1>Pizza Time</h1></div></div></div><div class="container"><div class="row m-0 p-0"><div class="col-12"><span class="filter_text">Filter by Allergens: </span><select name="filter" id="allergens_filter"><option></option></select></div></div><div class="row p-0 m-0" id="pizza_container"></div></div><div class="greybg d-none" id="greybg"></div><div class="basket d-none" id="basket"><h3>Basket</h3><span class="close_basket">X</span><div class="basket_content" id="basket_content"></div></div>');
}

let getPizzas = function () { return fetch("/api/pizza").then(res =>res.json()) }

let showPizzas = (pizzas) => {
	
	pizzas.map(pizza => (
		createPizzasAllergenList(pizza),
		createPizzasIngredientsList(pizza),
		document.querySelector('#pizza_container').insertAdjacentHTML('beforeend',`<div class="col-md-6 col-lg-3${allergenClass} pizzabox"><div class="pizza"><div class="pic text-center"><img src="/public/img/${pizza.img}" class="w-75"></div><div class="name">${pizza.name}<hr></div><div class="ingredients">Filling: ${ingredientClass}</div><div class="price">${pizza.price} Ft.-</div><div class="quantity"><span class="circle_sign plus_sign">+</span> <span class="quantity_value" id="quantity_value">1</span> <span class="circle_sign minus_sign">-</span></div><div class="button"><div class="order_pizza">Order</div></div></div></div>`),
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


let changeQuantity = (e) => {
		//console.log( document.getElementById(("#quantity_value") );
		console.log(e);
		}

	



const loadEvent = _ => {
	buildHTML();

	getAllergens()
		.then(allergens => showAllergens(allergens))

	getPizzas()
		.then(pizzas => showPizzas(pizzas))

	document.querySelector("#allergens_filter").addEventListener('change', hidePizzas);	






	let mathSigns = document.getElementsByClassName("circle_sign");

	console.log(mathSigns);

//	mathSigns.map(element => element.addEventListener('click', changeQuantity));

	// for (var i = 0; i < mathSigns.length; i++) {
	// 	console.log(mathSigns[i]);
	// 	element.addEventListener('click', changeQuantity);
    // };

	//document.getmathSignsByClassName("circle_sign").addEventListener('click', changeQuantity);		



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
