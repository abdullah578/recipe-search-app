import Search from "./models/Search";
import { elements, spinner } from "./views/base";
import * as searchView from "./views/searchView";
const state = {};
const searchController = async () => {
  //get the search data from UI
  const query = searchView.getInput();
  if (query) {
    //create new search object and add it to the state
    state.search = new Search(query);
    // clear input and diasplay results and show a loading spinner in the UI
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
