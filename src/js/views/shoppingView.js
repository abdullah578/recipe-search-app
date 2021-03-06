import { elements } from "./base";
export const displayResults = (item) => {
  elements.shoppingList.insertAdjacentHTML(
    "beforeend",
    `
    <li class="shopping__item" data-id=${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class="shopping__item--value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
        
        `
  );
};
export const deleteItem = (id) => {
  document
    .querySelector(`[data-id="${id}"]`)
    .parentElement.removeChild(document.querySelector(`[data-id="${id}"]`));
};
