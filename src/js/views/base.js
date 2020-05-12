export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  resultList: document.querySelector(".results__list"),
  paginationButtons: document.querySelector(".results__pages"),
  recipeDisplay: document.querySelector(".recipe"),
  shoppingList: document.querySelector(".shopping__list"),
  likedMenu: document.querySelector(".likes__field"),
  likedList: document.querySelector(".likes__list"),
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
export const formatTitle = (title, limit = 17) => {
  const titleArray = title.split(" ");
  const newTitle = [];
  let acc = 0;
  titleArray.forEach((elem) => {
    acc += elem.length;
    if (acc <= limit) newTitle.push(elem);
  });
  return `${newTitle.join(" ")}...`;
};
