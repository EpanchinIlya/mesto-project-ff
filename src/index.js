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
  addPopupCloseToEscEventListeners,
} from "./components/modal.js";

//  DOM узлы

const placesList = document.querySelector(".places__list");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeImageСaption = popupTypeImage.querySelector(".popup__caption");
const popupTypeImageImage = popupTypeImage.querySelector(".popup__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const inputOne = popupTypeEdit.querySelector("input:nth-of-type(1)");
const inputTwo = popupTypeEdit.querySelector("input:nth-of-type(2)");

export { profileTitle, profileDescription };

// Функция добавления слушателя открытия  и закрытия popup по кнопкам

function addPopupOpenCloseEventListeners(buttonOpenClass, popupMainClass) {
  const openButton = document.querySelector(buttonOpenClass);
  const popupMainDiv = document.querySelector(popupMainClass);
  const closeButton = popupMainDiv.querySelector(".popup__close");

  openButton.addEventListener("click", function () {
    if (popupMainDiv.classList.contains("popup_type_edit")) {
      inputOne.value = profileTitle.textContent;
      inputTwo.value = profileDescription.textContent;
    }
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

  popupTypeImageСaption.textContent = title.textContent;
  popupTypeImageImage.alt = image.alt;
  popupTypeImageImage.src = image.src;
  openModal(popupTypeImage);
}

function addCallBackForImageClose() {
  const imgClose = popupTypeImage.querySelector(".popup__close");
  imgClose.addEventListener("click", closeModal);
}

// Вывод карточек
addAllCards(initialCards);

addPopupOpenCloseEventListeners(".profile__edit-button", ".popup_type_edit");
addPopupOpenCloseEventListeners(".profile__add-button", ".popup_type_new-card");
addCallBackForImageClose();

//  обработка submit для формы изменения профиля
const formElementEditProfile = document.forms.edit_profile;

formElementEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = formElementEditProfile.name.value;
  profileDescription.textContent = formElementEditProfile.description.value;
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
