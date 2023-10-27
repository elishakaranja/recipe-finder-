// Selecting HTML elements and storing them in variables
const searchForm = document.querySelector('form'); // Select the form element
const searchInput = document.querySelector('#search'); // Select the search input field
const resultsList = document.querySelector('#results'); // Select the element where search results will be displayed

//Define the base URL for TheMealDB API
const baseUrl = 'https://www.themealdb.com/api/json/v1/1';

//Add a click event listener to the search form
searchForm.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission
    searchRecipes(); // Call the searchRecipes function when the form is clicked
});

//Function to search for recipes
async function searchRecipes() {
    const searchValue = searchInput.value.trim(); // Get the value from the search input and remove extra spaces

    //Search for meals by name using the MealDB API
    const searchResponse = await fetch(`${baseUrl}/search.php?s=${searchValue}`); // Make a request to the API
    const searchData = await searchResponse.json(); // Convert the API response to JSON
    console.log(searchData);  // Log the data to the console for debugging

    //Check if the search was successful and if there are meals found
    if (searchData.meals) {
        displayRecipes(searchData.meals); // Display search results by calling the displayRecipes function
    } else {
        resultsList.innerHTML = '<p>No meals found,Try again.</p>'; // Display a message if no meals were found
    }
}

//Function to display recipes
function displayRecipes(recipes) {
    let html = ''; // Initialize an empty string to store HTML content
    recipes.forEach((recipe) => { // Loop through each recipe in the data
        html += `
        <div>
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}"> <!-- Display the meal's image -->
            <h3>${recipe.strMeal}</h3> <!-- Display the meal's name -->
            <ul>
                <li>Category: ${recipe.strCategory}</li> <!-- Display the meal's category -->
                <li>Area: ${recipe.strArea}</li> <!-- Display the meal's area -->
            </ul>
            <a href="${recipe.strSource}" target="_blank">View Recipe</a> <!-- Create a link to view the recipe -->
        </div>
        `;
    });
    resultsList.innerHTML = html; // Display the HTML content in the resultsList element
}

/*Select elements related to comments
const commentForm = document.getElementById('comment-form'); // Select the comment form
const commentInput = document.getElementById('comment-input'); // Select the input field for adding comments
const commentsList = document.getElementById('comments-list'); // Select the list where comments will be displayed

//Event listener for the comment form
commentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission
    const newComment = commentInput.value.trim(); // Get the comment text and remove extra spaces
    if (newComment) {
        addComment(newComment); // Call the addComment function if a comment was provided
    }
});

// Function to add a new comment
function addComment(comment) {
    const commentItem = document.createElement('li'); // Create a new list item
    commentItem.textContent = comment; // Set the text content of the list item to the comment text
    commentsList.appendChild(commentItem); // Add the list item to the comments list
    commentInput.value = ''; // Clear the input field after adding the comment
}*/
