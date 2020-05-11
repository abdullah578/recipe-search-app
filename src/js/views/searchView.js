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
            <h4 class="results__name">${formatTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
    `;
  elements.resultList.insertAdjacentHTML("beforeend", displayHTML);
};
const formatTitle = (title, limit = 17) => {
  const titleArray = title.split(" ");
  const newTitle = [];
  let acc = 0;
  titleArray.forEach((elem) => {
    acc += elem.length;
    if (acc <= limit) newTitle.push(elem);
  });
  return `${newTitle.join(" ")}...`;
};
const buttonHTML = (page, type) =>
  `
<button class="btn-inline results__btn--${type}" data-goto=${
    type === "prev" ? page - 1 : page + 1
  }>
  <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${
          type === "prev" ? "left" : "right"
        }"></use>
    </svg>
</button>
`;
const renderButtons = (page, numResults, numPerPage) => {
  const totalPages = Math.ceil(numResults / numPerPage);
  let button = "";
  if (totalPages > 1) {
    if (page === 1) {
      button = buttonHTML(page, "next");
    } else if (page === totalPages) {
      button = buttonHTML(page, "prev");
    } else {
      button = `${buttonHTML(page, "prev")}
                ${buttonHTML(page, "next")}`;
    }
  }
  elements.paginationButtons.innerHTML = button;
};
export const displayResults = (recipes, page = 1, numPerPage = 10) => {
  renderButtons(page, recipes.length, numPerPage);
  const start = (page - 1) * numPerPage;
  const end = page * numPerPage;
  console.log(start);
  recipes.slice(start, end).forEach((elem) => {
    renderRecipe(elem);
  });
};

export const removeInput = () => {
  elements.searchInput.value = "";
};
export const removeResults = () => {
  elements.resultList.innerHTML = "";
};
