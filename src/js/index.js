import Search from "./models/Search";
import Recipe from "./models/Recipe";
import Shopping from "./models/Shopping";
import Likes from "./models/Likes";
import { elements, spinner } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as shoppingView from "./views/shoppingView";
import * as likesView from "./views/likesView";
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
      recipeView.displayResults(state.recipe, state.likes.isLiked(recipe_id));
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
const likesController = () => {
  //create a new like object if empty
  if (!state.likes) state.likes = new Likes();
  const { recipe_id, publisher, image, title } = state.recipe;
  //if the item is not liked...
  if (!state.likes.isLiked(recipe_id)) {
    //add item to likes list
    const newItem = state.likes.addItem(recipe_id, title, publisher, image);
    // show a filled heart
    likesView.toggleLike(true);
    //display the liked item in the UI
    likesView.addItem(newItem);
    //store item in local storage
    state.likes.storeData();
  }
  //if the item is liked...
  else {
    //remove item from the likes list
    state.likes.deleteItem(recipe_id);

    //show a empty heart
    likesView.toggleLike(false);
    //remove item from UI
    likesView.removeItem(recipe_id);
    //remove item from local storage
    state.likes.storeData();
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
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
  } else if (e.target.matches(".recipe__love,.recipe__love *")) {
    likesController();
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
window.addEventListener("load", () => {
  state.likes = new Likes();
  state.likes.getData();
  console.log(state.likes);
  likesView.toggleLikeMenu(state.likes.getNumLikes());
  state.likes.likes.forEach((el) => {
    likesView.addItem(el);
  });
});
