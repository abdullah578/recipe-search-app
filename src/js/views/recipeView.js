import { elements } from "./base";
import { Fraction } from "fractional";

const convertToFraction = (num) => {
  if (!num) return "?";
  num = Math.round(num * 10000) / 10000;
  const [int, dec] = num
    .toString()
    .split(".")
    .map((el) => parseInt(el));
  if (!dec) return num;
  else if (int === 0) {
    const fr = new Fraction(num);
    return `${fr.numerator}/${fr.denominator}`;
  } else {
    num = num - int;
    const fr = new Fraction(num);
    return `${int} ${fr.numerator}/${fr.denominator}`;
  }
};
export const displayResults = (recipeObj, isLiked) => {
  const displayHTML = `
    <figure class="recipe__fig">
    <img src="${recipeObj.image}" alt="Tomato" class="recipe__img">
    <h1 class="recipe__title">
        <span>${recipeObj.title}</span>
    </h1>
</figure>
<div class="recipe__details">
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          recipeObj.cookingTime
        }</span>
        <span class="recipe__info-text"> minutes</span>
    </div>
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          recipeObj.servings
        }</span>
        <span class="recipe__info-text"> servings</span>
        <div class="recipe__info-buttons">
            <button class="btn-tiny btn-decrease">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-minus"></use>
                </svg>
            </button>
            <button class="btn-tiny btn-increase" >
                <svg>
                    <use href="img/icons.svg#icon-circle-with-plus"></use>
                </svg>
            </button>
        </div>
    </div>
    <button class="recipe__love">
        <svg class="header__likes">
            <use href="img/icons.svg#icon-heart${
              isLiked ? "" : "-outlined"
            }"></use>
        </svg>
    </button>
</div>
<div class="recipe__ingredients">
    <ul class="recipe__ingredient-list">
    ${recipeObj.ingredients
      .map(
        (elem) => `       
     <li class="recipe__item">
    <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${convertToFraction(elem.count)}</div>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${elem.unit}</span>
       ${elem.ingredient}
    </div>
</li>`
      )
      .join("")}
    </ul>
    <button class="btn-small recipe__btn recipe__btn--shop">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-shopping-cart"></use>
        </svg>
        <span>Add to shopping list</span>
    </button>
</div>
<div class="recipe__directions">
    <h2 class="heading-2">How to cook it</h2>
    <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__by">${
          recipeObj.publisher
        }</span>. Please check out directions at their website.
    </p>
    <a class="btn-small recipe__btn" href="${recipeObj.url}" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>
    </a>
</div>
    `;
  elements.recipeDisplay.innerHTML = displayHTML;
};

export const removeResults = () => {
  elements.recipeDisplay.innerHTML = "";
};

export const displayUpdatedServings = (recipeObj) => {
  //update servings
  document.querySelector(".recipe__info-data--people").textContent =
    recipeObj.servings;
  //update ingrdients
  Array.from(document.querySelectorAll(".recipe__count")).forEach(
    (elem, index) => {
      elem.textContent = convertToFraction(recipeObj.ingredients[index].count);
    }
  );
};
