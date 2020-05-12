export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  resultList: document.querySelector(".results__list"),
  paginationButtons: document.querySelector(".results__pages"),
  recipeDisplay: document.querySelector(".recipe"),
  shoppingList: document.querySelector(".shopping__list"),
};

export const spinner = (parent) => {
  const innerHTML = `
    <div class="loader"> 
       <svg>
          <use href="img/icons.svg#icon-cw"></use>
       </svg>
    </div>
    `;
  parent.innerHTML = innerHTML;
};
