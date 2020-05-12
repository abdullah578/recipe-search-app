import Search from "./models/Search";
import Recipe from "./models/Recipe";
import Shopping from "./models/Shopping";
import { elements, spinner } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as shoppingView from "./views/shoppingView";
const state = {};
window.state = state;
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
    //highlight the selected item in the search list
    if (state.search) searchView.highlightSelected(recipe_id);
    //show a loading spinner in the UI
    spinner(elements.recipeDisplay);
    try {
      //get the information for the recipe
      await state.recipe.getRecipe();
      //calculate cooking time
      state.recipe.calcCookingTime();
      //display the recipe in the UI
      state.recipe.parseIngredients();
      recipeView.removeResults();
      recipeView.displayResults(state.recipe);
    } catch (ex) {
      alert(ex);
    }
  }
};
const shoppingController = () => {
  //create new shopping list if empty
  if (!state.shoppingList) state.shoppingList = new Shopping();
  //add ingredient items to shopping list and display in UI
  state.recipe.ingredients.forEach((curr) => {
    const item = state.shoppingList.addItem(
      curr.count,
      curr.unit,
      curr.ingredient
    );
    shoppingView.displayResults(item);
  });
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
elements.recipeDisplay.addEventListener("click", (e) => {
  if (e.target.matches(".btn-decrease,.btn-decrease *")) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("-");
      recipeView.displayUpdatedServings(state.recipe);
    }
  } else if (e.target.matches(".btn-increase,.btn-increase *")) {
    state.recipe.updateServings("+");
    recipeView.displayUpdatedServings(state.recipe);
  } else if (e.target.matches(".recipe__btn--shop,.recipe__btn--shop *")) {
    shoppingController();
  }
});
elements.shoppingList.addEventListener("click", (e) => {
  const id = e.target.closest(".shopping__item").dataset.id;
  if (e.target.matches(".shopping__delete,.shopping__delete *")) {
    state.shoppingList.deleteItem(id);
    shoppingView.deleteItem(id);
  } else if (e.target.matches(".shopping__item--value")) {
    const count = parseInt(e.target.value);
    state.shoppingList.updateItems(count, id);
  }
});
