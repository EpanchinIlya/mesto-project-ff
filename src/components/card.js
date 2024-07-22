export { createCard, toggleLikeCallBackFunction };

import { addRemoveLikeCard } from "./api.js";

import { config } from "../index.js";

const cardTemplate = document.querySelector("#card-template").content;

// создание карточки

function createCard(
  card,
  deleteCallBackFunction,
  likeCallBackFunction,
  popupCallBackFunction,
  userId
) {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  const cardImage = cardTemplateClone.querySelector(".card__image");
  const cardDeleteButton = cardTemplateClone.querySelector(
    ".card__delete-button"
  );
  const cardLikeButton = cardTemplateClone.querySelector(".card__like-button");
  const cardLikeNumber = cardTemplateClone.querySelector(".card__like-number");
  const cardTitle = cardTemplateClone.querySelector(".card__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  if (card.likes !== undefined) {
    // неновая карточка
    cardLikeNumber.textContent = card.likes.length;

    if (card.owner._id === userId) {
      // карточка данного юзера
      cardDeleteButton.classList.remove("card__delete-button_hidden");
      cardDeleteButton.addEventListener("click", () => {
        deleteCallBackFunction(cardDeleteButton, card);
      });
    }

    if (
      card.likes.some((item) => {
        return item._id === userId;
      })
    ) {
      cardLikeButton.classList.add("card__like-button_is-active");
    }
  } else {
    // новая карточка
    cardLikeNumber.textContent = 0;
    cardDeleteButton.classList.remove("card__delete-button_hidden");
    cardDeleteButton.addEventListener("click", () => {
      deleteCallBackFunction(cardDeleteButton, card);
    });
  }

  cardLikeButton.addEventListener("click", (evt) => {
    likeCallBackFunction(evt, card._id, cardLikeNumber);
  });
  cardImage.addEventListener("click", popupCallBackFunction);
  return cardTemplateClone;
}

// Функция переключения like карточки c запросом на сервер
function toggleLikeCallBackFunction(evt, cardId, cardLikeNumber) {
  addRemoveLikeCard(
    config,
    cardId,
    !evt.target.classList.contains("card__like-button_is-active")
  )
    .then((result) => {
      if (result._id === cardId) {
        cardLikeNumber.textContent = result.likes.length;
        evt.target.classList.toggle("card__like-button_is-active");
      }
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}
