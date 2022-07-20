const searchFood = async () => {
    const inputFoodName = document.getElementById('search-field');
    const searchText = inputFoodName.value;
    inputFoodName.value = '';
    if(searchText == ''){
        const noResult = document.getElementById('no-result');
        noResult.innerText = 'Please write something to get result.';
    }
    else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        const res = await fetch(url);
        const data = await res.json();
        displayResult(data.meals)
    }

/*         fetch(url)
            .then(res => res.json())
            .then(food => displayResult(food.meals)) 
    
    */
};

const displayResult = getMeals => {
    const displayData = document.getElementById('display-data');
    displayData.textContent = '';
    if(getMeals.length == 0){
        console.log('your result is not found');
    }
    else{
        getMeals.forEach( meal => {
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
                <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
                    </div>
                </div>
            `
            displayData.appendChild(div)
        });
    }
};

const loadMealDetails = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0])
/*     fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0])) */
};
const displayMealDetails = displayMeal => {
    const getResultId = document.getElementById('get-single-details')
    const creatResultDiv = document.createElement('div');
    getResultId.textContent = '';
    creatResultDiv.innerHTML = `
        <div class="card">
            <img src="${displayMeal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${displayMeal.strMeal}</h5>
            <p class="card-text">${displayMeal.strInstructions.slice(0, 250)}</p>
            <a href="${displayMeal.strYoutube}" target="_blank" class="btn btn-primary">Go Youtube</a>
            </div>
        </div>
    `
    getResultId.appendChild(creatResultDiv);
};
