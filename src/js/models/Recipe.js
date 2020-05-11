import axios from "axios";

class Recipe {
  constructor(recipe_id) {
    this.recipe_id = recipe_id;
    this.servings=4;
  }
  async getRecipe() {
    try {
      const recipe = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.recipe_id}`
      );
      this.title = recipe.data.recipe.title;
      this.publisher = recipe.data.recipe.publisher;
      this.image = recipe.data.recipe.image_url;
      this.url = recipe.data.recipe.source_url;
      this.ingredients = recipe.data.recipe.ingredients;
    } catch (ex) {
      alert(ex);
    }
  }
  calcCookingTime(){
     this.cookingTime=(Math.ceil(this.ingredients.length/3))*50;
  }
}

export default Recipe;
