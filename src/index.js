import "./styles/index.css"; // добавьте импорт главного файла стилей

import { initialCards } from "./components/cards.js";
import {
  createCard,
  deleteCard,
  toggleLikeCallBackFunction,
} from "./components/card.js";
import {
  openModal,
  closeModal,
  addpopupCloseToEscEventListeners,
} from "./components/modal.js";

//  DOM узлы

const placesList = document.querySelector(".places__list");
const popup_type_image = document.querySelector(".popup_type_image");
const popup_type_image__caption =
  popup_type_image.querySelector(".popup__caption");
const popup_type_image__image = popup_type_image.querySelector(".popup__image");
const profile__title = document.querySelector(".profile__title");
const profile__description = document.querySelector(".profile__description");

export { profile__title, profile__description };

// Функция добавления слушателя открытия  и закрытия popup по кнопкам

function addPopupOpenCloseEventListeners(buttonOpenClass, popupMainClass) {
  const openButton = document.querySelector(buttonOpenClass);
  const popupMainDiv = document.querySelector(popupMainClass);
  const closeButton = popupMainDiv.querySelector(".popup__close");

  openButton.addEventListener("click", function () {
    openModal(popupMainDiv);
  });
  closeButton.addEventListener("click", function () {
    closeModal();
  });
}

// Функция вывода всех карточек

function addAllCards(initialCards) {
  initialCards.forEach((item) =>
    placesList.append(
      createCard(
        item,
        deleteCard,
        toggleLikeCallBackFunction,
        createPopupCallBackFunction
      )
    )
  );
}

// Добавление одной карочки в начало DOM

function addOneCard(card) {
  placesList.prepend(
    createCard(
      card,
      deleteCard,
      toggleLikeCallBackFunction,
      createPopupCallBackFunction
    )
  );
}

// Функция открытия/прорисовки/закрытия popup картинки по нажатию на картинку

function createPopupCallBackFunction(evt) {
  const card = evt.target.closest(".card");
  const image = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");

  popup_type_image__caption.textContent = title.textContent;
  popup_type_image__image.alt = image.alt;
  popup_type_image__image.src = image.src;
  openModal(popup_type_image);
  addpopupCloseToEscEventListeners();

  popup_type_image
    .querySelector(".popup__close")
    .addEventListener("click", closeModal);
}

// Вывод карточек
addAllCards(initialCards);

addPopupOpenCloseEventListeners(".profile__edit-button", ".popup_type_edit");
addPopupOpenCloseEventListeners(".profile__add-button", ".popup_type_new-card");

//  обработка submit для формы изменения профиля
const formElementEditProfile = document.forms.edit_profile;

formElementEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profile__title.textContent = formElementEditProfile.name.value;
  profile__description.textContent = formElementEditProfile.description.value;
  closeModal();
});

///////////////////////////////

//  обработка submit для формы добавления карточки
const formElementAddCard = document.forms.new_place;

formElementAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const card = {
    name: formElementAddCard.place_name.value,
    link: formElementAddCard.link.value,
  };

  addOneCard(card);
  formElementAddCard.reset();
  closeModal();
});

///////////////////////////////
