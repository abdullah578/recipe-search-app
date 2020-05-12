import { elements } from "./base";
const displayResults = (items) => {
  items.forEach((curr) => {
    elements.shoppingList.insertAdjacentHTML(
      "beforeend",
      `
    <li class="shopping__item" data-id=${curr.id}>
        <div class="shopping__count">
            <input type="number" value="${curr.count}" step="${curr.count}">
            <p>${curr.unit}</p>
        </div>
        <p class="shopping__description">${curr.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
        
        `
    );
  });
};
const deleteItem = (id) => {
  document
    .querySelector(`[data-id="${id}"]`)
    .parentElement.removeChild(document.querySelector(`[data-id="${id}"]`));
};
