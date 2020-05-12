import { elements, formatTitle } from "./base";
export const toggleLike = (isLiked) => {
  const icon = isLiked
    ? "img/icons.svg#icon-heart"
    : "img/icons.svg#icon-heart-outlined";
  document.querySelector(".recipe__love use").setAttribute("href", icon);
};
export const toggleLikeMenu = (numLikes) => {
  elements.likedMenu.style.visibility = numLikes === 0 ? "hidden" : "visible";
};

export const addItem = (likeObj) => {
  const displayHTML = `
    <li>
        <a class="likes__link" href="#${likeObj.id}">
            <figure class="likes__fig">
                <img src="${likeObj.image}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${formatTitle(likeObj.title)}</h4>
                <p class="likes__author">${likeObj.author}</p>
            </div>
        </a>
    </li>
    `;
  elements.likedList.insertAdjacentHTML("beforeend", displayHTML);
};

export const removeItem = (id) => {
  const elem = document.querySelector(`.likes__link[href="#${id}"]`)
    .parentElement;
  elem.parentElement.removeChild(elem);
};
