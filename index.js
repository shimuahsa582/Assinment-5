//API Call and connect all div id
const mealFoodApiUrl = 'https://www.themealdb.com/api/json/v1/1/';
const searchInputButton = document.getElementById('search_input');
const searchButton = document.getElementById('search_button');
const searchInputResultShow = document.getElementById('search_result_content');
const foodDetailsResult = document.getElementById('details_result_content');

//search box functionality and food results functionality
searchButton.addEventListener('click', () => {
	searchFoodName(searchInputButton.value);
});
const searchFoodName = (keyword) => {
	if (keyword != '') {
		showLoader(searchInputResultShow, true);
		let url = `${mealFoodApiUrl}search.php?s=${keyword}`;
		fetch(encodeURI(url)).then((data) => data.json()).then((data) => {
			showLoader(searchInputResultShow, false);
			displayFoodResult(data);
		});
	}
};

// search result not found functionality
const displayFoodResult = (data) => {
	if (data.meals == null) {
		notFoundResultMassage();
	} else {
		searchInputResultShow.innerHTML = createResultCard(data);
	}
};
const notFoundResultMassage = () => {
	searchInputResultShow.innerHTML = `<h3> This Food Not found! Please search agin valuable food names.</h3>`;
};

//matching search food show functionality
const createResultCard = (data) => {
	let meals = data.meals;
	let elementString = '';
	meals.forEach((data) => {
		elementString += `<div class="food-item m-3 rounded bg-primary p-2 text-white" onclick="foodDetailsResultShow(${data.idMeal})">
                <div class="thumbnail">
                    <img src="${data.strMealThumb}"/>
                </div>
                <div class="food-name">
                    <h3>${data.strMeal}</h3>
                </div>
            </div>
			`;
	});
	return elementString;
};

//food details functionality with 5 material
const foodDetailsResultShow = (id) => {
	let url = `${mealFoodApiUrl}lookup.php?i=${id}`;
	fetch(encodeURI(url)).then((data) => data.json()).then((data) => {
		let item = data.meals[0];
		let ingredients = '';
		for (let i = 1; i <= 5; i++) {
			ingredients += `<li> ${item['strIngredient' + i]}</li>`;
		}
		foodDetailsResult.innerHTML = `<div id="moreDetails" class=" ">
              <div class="moreDetails-content bg-primary rounded mt-4 ">

                    <button class="btn btn-primary">"id="moreDetails-btn" onclick="foodDetailsResultHide()">X</button>
                    <div class=" d-flex">
                    <img src="${item.strMealThumb}" />
                    <div class="details p-3 text-white">
                      <h2>${item.strMeal}</h2>
                      <h4>Making materials</h4>
                      <ol>${ingredients}</ol>
                    </div>
                    </div>          
                  </div>  
            </div>
		`;
	});
};

// food Details Result Show and Hide functionality
const foodDetailsResultHide = () => {
	foodDetailsResult.innerHTML = '';
};
const showLoader = (parent, argument) => {
	argument ? (parent.innerHTML = `<div class="loader"></div>`) : '';
};
