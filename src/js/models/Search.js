import axios from "axios";
class Search {
  constructor(query) {
    this.query = query;
  }
  async getSearchResults() {
    try {
      const result = await axios(
        `https://forkify-api.herokuapp.com/api/search?&q=${this.query}`
      );
      this.recipes = result.data.recipes;
    } catch (ex) {
      alert(ex);
    }
  }
}

export default Search;
