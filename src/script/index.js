                            // API
// Search(Name) API = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"
// Search(Id) API = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="

                        // HTML elements
const mealCards = document.getElementById("meal-cards");
const modalContent = document.getElementById("my_modal_4");
const searchBar = document.getElementById("searchBar");

                        // Detail Function
const moreInfo = async (event) => {
    // Get Meal Data from button and api
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${event.target.id}`);
    const { meals } = await data.json();
    const [meal] = meals;
    const strIngredient = Object.keys(meal).filter(key => {
        if (key.indexOf("strIngredient") != -1) {
            return key;
        }
    })
    const strMeasure = Object.keys(meal).filter(key => {
        if (key.indexOf("strMeasure") != -1) {
            return key;
        }
    })
    let ingrediants = "";
    strIngredient.map((key,index) => {
        if (meal[key]) {
            ingrediants += meal[key] + ` (${meal[strMeasure[index]]}), `;
        }
    })
    console.log(ingrediants);
    console.log(strIngredient);
    console.log(strMeasure);

    // Show The Modal
    my_modal_4.showModal();

    // Inner content of the modal
    modalContent.innerHTML = `
    <div class="modal-box w-11/12 max-w-5xl">
        <img class="w-fit object-cover" src="${meal.strMealThumb}" />
        <h3 class="font-bold text-lg">${meal.strMeal}</h3>
        <p class="py-4">
            <b>Ingredients: </b>
            ${ingrediants}
            <br/> <br/>
            <b>Instruction: </b>
            ${meal.strInstructions}
        </p>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
            </form>
        </div>
    </div>`
}

                            // Show Function
const showMeals = async (meals) => {
    mealCards.innerHTML = "";
    await meals.map(meal => {
        mealCards.innerHTML +=
            `
            <div class="card lg:card-side bg-base-100 shadow-xl">
                <figure>
                    <img class="object-cover" src="${meal.strMealThumb}" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">
                        ${meal.strMeal}
                    </h2>
                    <p>
                        <b>Category:</b> ${meal.strCategory} <br/>
                        <b>Region: </b> ${meal.strArea} <br/>
                        ${meal.strTags ? `<b>Tags: </b> ${meal.strTags}` : ""}
                    </p>
                    <div class="card-actions justify-end">
                        <button onclick="moreInfo(event)" id="${meal.idMeal}" class="btn btn-warning">
                            More Info
                        </button>
                    </div>
                </div>
            </div>
            `
    });
}
                    // Meal Search Function
const mealSearch = async (name) => {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const meals = await data.json();
    showMeals(meals.meals)
}
                // SearchBar Input Listener
searchBar.addEventListener("input", (event) => {
    mealSearch(`${event.target.value}`);
})

                    // Initial Function Call
mealSearch("");
