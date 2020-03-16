let input = document.getElementById('searchInput');
let searchButton = document.getElementById('searchButton');
const proxy = 'https://cors-anywhere.herokuapp.com/'; // in case there might be a forbidden access to the api

// searching a cocktail
searchButton.addEventListener('click', function () {
    checkTheInput()
});
input.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        checkTheInput();
    }
});

// to check the input is not empty
function checkTheInput() {
    let inputValue = document.getElementById("searchInput").value;
    if(inputValue == ""){
        alert("Search field is empty. Please type a cocktail name");
    }else{
        doTheThing();
    }
}

function doTheThing() {
        selectDrink();
        setVisibilityforSearch();

async function selectDrink() {
    let response= await fetch(`${proxy}https://www.thecocktaildb.com/api/json/v1/1/search.php?s=` + input.value + '');
    let selectDrinkData = await response.json();
    //console.log(selectDrinkData);

    let searchDrinkName = selectDrinkData.drinks[0].strDrink; // to get drink name
    document.getElementById('search-drink-name').innerHTML = searchDrinkName;
    console.log(searchDrinkName);

    let searchDrinkImage = selectDrinkData.drinks[0].strDrinkThumb; // to get drink image
    document.getElementById('search-drink-Image').setAttribute('src', searchDrinkImage);
    console.log(selectDrinkData.drinks[0]);

    // to get drinks ingredients
    let searchdrinkIngredient1 = selectDrinkData.drinks[0].strIngredient1;
    let searchdrinkIngredient2 = selectDrinkData.drinks[0].strIngredient2;
    let searchdrinkIngredient3 = selectDrinkData.drinks[0].strIngredient3;
    let searchdrinkIngredient4 = selectDrinkData.drinks[0].strIngredient4;
    let searchdrinkIngredient5 = selectDrinkData.drinks[0].strIngredient5;
    let searchdrinkIngredient6 = selectDrinkData.drinks[0].strIngredient6;
    // console.log(drinkIngredient1, drinkIngredient2, drinkIngredient3, drinkIngredient4, drinkIngredient5, drinkIngredient6);

    document.getElementById('search-ingredient1').innerHTML = searchdrinkIngredient1;
    document.getElementById('search-ingredient2').innerHTML = searchdrinkIngredient2;
    document.getElementById('search-ingredient3').innerHTML = searchdrinkIngredient3;
    document.getElementById('search-ingredient4').innerHTML = searchdrinkIngredient4;
    document.getElementById('search-ingredient5').innerHTML = searchdrinkIngredient5;
    document.getElementById('search-ingredient6').innerHTML = searchdrinkIngredient6;


    document.getElementById('search-ingredient-Image1').src = 'https://www.thecocktaildb.com/images/ingredients/'+searchdrinkIngredient1 +'-Small.png';
    document.getElementById('search-ingredient-Image2').src = 'https://www.thecocktaildb.com/images/ingredients/'+searchdrinkIngredient2 +'-Small.png';
    document.getElementById('search-ingredient-Image3').src = 'https://www.thecocktaildb.com/images/ingredients/'+searchdrinkIngredient3 +'-Small.png';
    document.getElementById('search-ingredient-Image4').src = 'https://www.thecocktaildb.com/images/ingredients/'+searchdrinkIngredient4 +'-Small.png';
    document.getElementById('search-ingredient-Image5').src = 'https://www.thecocktaildb.com/images/ingredients/'+searchdrinkIngredient5 +'-Small.png';
    document.getElementById('search-ingredient-Image6').src = 'https://www.thecocktaildb.com/images/ingredients/'+searchdrinkIngredient6 +'-Small.png';

    // to get drink instructions
    let selectDrinkInstructions = selectDrinkData.drinks[0].strInstructions;
    document.getElementById('search-drink-Instructions').innerHTML = ('Instructions: ' + selectDrinkInstructions);
}
selectDrink();
}

function setVisibilityforSearch() {
    let searchVisibility = document.getElementById('toHide');
    searchVisibility.style.visibility = 'visible';
}
// getting most popular drinks

async function mostPopularDrinks() {
    let response= await fetch(`${proxy}https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute`);
    let popularDrinks = await response.json();
    console.log(popularDrinks);

    let popularDrinkImages = document.getElementById('most-popular-drinks');
    let popularDrinksArray = [];
    for (let i = 0; i < 12 ; i++) {
        popularDrinksArray.push(popularDrinks.drinks[i].strDrinkThumb);
    }

    let popularDrinksNameArray = [];
    for (let i = 0; i < 12 ; i++) {
        popularDrinksNameArray.push(popularDrinks.drinks[i].strDrink.toUpperCase());
        console.log(popularDrinksNameArray);
    }
    //console.log(popularDrinks);
    let imagesContainer;
    let paragraphContainer;

    for (let i = 0; i < popularDrinksArray.length; i++) {
        let img = document.createElement('img');
        img.src = popularDrinksArray[i];
        img.height = 200; // to size images (height)
        img.width = 200; // to size images (width)
        imagesContainer = document.getElementById('col'+i);
        imagesContainer.appendChild(img);

        let popular_drink = document.createElement('p');
        popular_drink.innerHTML = popularDrinksNameArray[i];
        paragraphContainer = document.getElementById('colname' +i);
        paragraphContainer.appendChild(popular_drink);

    }
    console.log(popularDrinksArray);
    // getting name for most popular drinks

}
mostPopularDrinks();


let randomButton = document.getElementById('random-button');

randomButton.addEventListener('click', function() {

    // to get a random drink
    async function randomDrink(link) {
        let response = await fetch (link);
        let randomDrinkData = await response.json();
        console.log(randomDrinkData);

        let drinkName = randomDrinkData.drinks[0].strDrink; // to get drink name
        document.getElementById('drinkName').innerHTML = drinkName;

        let drinkImage = randomDrinkData.drinks[0].strDrinkThumb; // to get drink image
        document.getElementById('drinkImage').setAttribute('src', drinkImage);

        // to get drinks ingredients
        let drinkIngredient1 = randomDrinkData.drinks[0].strIngredient1;
        let drinkIngredient2 = randomDrinkData.drinks[0].strIngredient2;
        let drinkIngredient3 = randomDrinkData.drinks[0].strIngredient3;
        let drinkIngredient4 = randomDrinkData.drinks[0].strIngredient4;
        let drinkIngredient5 = randomDrinkData.drinks[0].strIngredient5;
        let drinkIngredient6 = randomDrinkData.drinks[0].strIngredient6;

        document.getElementById('drinkIngredient1').innerHTML = drinkIngredient1;
        document.getElementById('drinkIngredient2').innerHTML = drinkIngredient2;
        document.getElementById('drinkIngredient3').innerHTML = drinkIngredient3;
        document.getElementById('drinkIngredient4').innerHTML = drinkIngredient4;
        document.getElementById('drinkIngredient5').innerHTML = drinkIngredient5;
        document.getElementById('drinkIngredient6').innerHTML = drinkIngredient6;


        document.getElementById('ingredientImage1').src = 'https://www.thecocktaildb.com/images/ingredients/'+drinkIngredient1 +'-Small.png';
        document.getElementById('ingredientImage2').src = 'https://www.thecocktaildb.com/images/ingredients/'+drinkIngredient2 +'-Small.png';
        document.getElementById('ingredientImage3').src = 'https://www.thecocktaildb.com/images/ingredients/'+drinkIngredient3 +'-Small.png';
        document.getElementById('ingredientImage4').src = 'https://www.thecocktaildb.com/images/ingredients/'+drinkIngredient4 +'-Small.png';
        document.getElementById('ingredientImage5').src = 'https://www.thecocktaildb.com/images/ingredients/'+drinkIngredient5 +'-Small.png';
        document.getElementById('ingredientImage6').src = 'https://www.thecocktaildb.com/images/ingredients/'+drinkIngredient6 +'-Small.png';

        // to get drink instructions
        let drinkInstructions = randomDrinkData.drinks[0].strInstructions;
        document.getElementById('drinkInstructions').innerHTML = ('Instructions: ' + drinkInstructions);

        // how to serve the drink
        let drinkGlass = randomDrinkData.drinks[0].strGlass;
        document.getElementById('drinkGlass').innerHTML = ('Drink glass: ' + drinkGlass);

    }
    randomDrink(`${proxy}https://www.thecocktaildb.com/api/json/v1/1/random.php`);
});