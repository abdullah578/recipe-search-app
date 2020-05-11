import Search from "./models/Search";
import { elements } from "./views/base";
import * as searchView from "./views/searchView";
const state = {};
const searchController = async () => {
  //get the search data from UI
  const query = searchView.getInput();
  if (query) {
    //create new search object and add it to the state
    state.search = new Search(query);
    // show a loading spinner in the UI

    //get recipes for the search query
    await state.search.getSearchResults();
    //render search results in UI
    searchView.displayResults(state.search.recipes);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchController();
});
