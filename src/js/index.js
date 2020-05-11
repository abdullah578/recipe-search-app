import Search from "./models/Search";
import Recipe from "./models/Recipe";
import { elements, spinner } from "./views/base";
import * as searchView from "./views/searchView";
const state = {};
const searchController = async () => {
  //get the search data from UI
  const query = searchView.getInput();
  if (query) {
    //create new search object and add it to the state
    state.search = new Search(query);
    // clear input and display results and show a loading spinner in the UI
    searchView.removeInput();
    searchView.removeResults();
    spinner(elements.resultList);
    //get recipes for the search query
    await state.search.getSearchResults();
    //clear the spinner and render search results in UI
    searchView.removeResults();
    searchView.displayResults(state.search.recipes);
  }
};

const recipeController = async () => {
  //get the recipe ID from the page URL
  const recipe_id = window.location.hash.replace("#", "");
  if (recipe_id) {
    //create new recipe object
    state.recipe = new Recipe(recipe_id);
    //show a loading spinner in the UI
    spinner(elements.recipeDisplay);
    try {
      //get the information for the recipe
      await state.recipe.getRecipe();
      //calculate cooking time
      state.recipe.calcCookingTime();
      //display the recipe in the UI
      state.recipe.parseIngredients();
      console.log(state.recipe);
    } catch (ex) {
      alert(ex);
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchController();
});
elements.paginationButtons.addEventListener("click", (e) => {
  const closestButton = e.target.closest(".btn-inline");
  const goToPage = parseInt(closestButton.dataset.goto);
  searchView.removeResults();
  searchView.displayResults(state.search.recipes, goToPage);
});
["hashchange", "load"].forEach((event) => {
  window.addEventListener(event, recipeController);
});
