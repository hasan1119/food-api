document.getElementById('search').addEventListener('click', function () {
    const foodInput = document.getElementById('foodInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodInput}`)
        .then(res => res.json())
        .then(data => showFoods(data))
})


const foodContainer = document.getElementById('food-container')


function showFoods(foods) {
    foodContainer.textContent = ''
    const foodsArray = foods.meals
    foodsArray.forEach(food => {

        // console.log(food);
        const div = document.createElement('div')


        div.innerHTML = `
            <div class="card m-2" style="width: 14rem; height:400px">
                    <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${food.strMeal} </h5>
                        <p>Description: ${(food.strInstructions).slice(0,50)}
                        <button onclick="details('${food.idMeal}')" href="#" class="btn d-block mt-3  btn-primary">Details</button>
                    </div>
           </div>`




        foodContainer.appendChild(div)


    });
}

const foodDetailsContainer = document.getElementById('food-details')

function details(id) {
    const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(api)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            console.log(meal);
            const div = document.createElement('div')
            div.innerHTML = `
            <img width='250px' src='${meal.strMealThumb}'>
            <h3>Name: ${meal.strMeal}</h3>
            <p>Population: ${meal.strInstructions.slice(0,100)}</p>
            <a target='_blank' href='${meal.strYoutube}' class='btn btn-primary'>Go to YouTube</a>
            
            `
            foodDetailsContainer.innerHTML = ''
            foodDetailsContainer.appendChild(div)
        })
}