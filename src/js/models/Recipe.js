import axios from "axios";

class Recipe {
  constructor(recipe_id) {
    this.recipe_id = recipe_id;
    this.servings = 4;
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
  calcCookingTime() {
    this.cookingTime = Math.ceil(this.ingredients.length / 3) * 50;
  }
  updateServings(type) {
    const newServings = type === "+" ? this.servings + 1 : this.servings - 1;
    this.ingredients.forEach((obj) => {
      obj.count *= newServings / this.servings;
    });
    this.servings = newServings;
  }
  parseIngredients() {
    const longUnits = [
      "tablespoons",
      "tablespoon",
      "teaspoons",
      "teaspoon",
      "ounces",
      "ounce",
      "cups",
      "pounds",
    ];
    const units = [
      "tbsp",
      "tbsp",
      "tsp",
      "tsp",
      "oz",
      "oz",
      "cup",
      "pound",
      "kg",
      "g",
    ];
    this.ingredients = this.ingredients.map((curr) => {
      //convert string to lower case and remove all parentheses
      curr = curr.toLowerCase();
      curr = curr.replace(/ *\([^)]*\) */g, " ");
      //replace all long units with units
      longUnits.forEach((elem, index) => {
        curr = curr.replace(elem, units[index]);
      });
      const ingArray = curr.split(" ");
      //find the index of the unit
      const unitIndex = ingArray.findIndex((elem) => units.includes(elem));
      let ingObj;
      //seperate the ingredient into count, unit and ingredient and return the object
      if (unitIndex !== -1) {
        if (unitIndex === 1) {
          ingObj = {
            count: eval(ingArray[0].replace("-", "+")),
            unit: ingArray[1],
            ingredient: ingArray.slice(2).join(" "),
          };
        } else {
          ingObj = {
            count: eval(ingArray.slice(0, unitIndex).join("+")),
            unit: ingArray[unitIndex],
            ingredient: ingArray.slice(unitIndex + 1).join(" "),
          };
        }
      } else if (parseInt(ingArray[0])) {
        ingObj = {
          count: parseInt(ingArray[0]),
          unit: "",
          ingredient: ingArray.slice(1).join(" "),
        };
      } else {
        ingObj = {
          count: 1,
          unit: "",
          ingredient: ingArray.join(" "),
        };
      }
      return ingObj;
    });
  }
}

export default Recipe;
