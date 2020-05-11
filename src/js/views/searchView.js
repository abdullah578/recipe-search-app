import { elements } from "./base";
export const getInput = () => {
  const query = elements.searchInput.value;
  return query;
};

const renderRecipe = (recipe) => {
  const displayHTML = `
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src=${recipe.image_url} alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
    `;
  elements.resultList.insertAdjacentHTML("beforeend", displayHTML);
};

export const displayResults = (recipes) => {
  recipes.forEach((elem) => {
    renderRecipe(elem);
  });
};
