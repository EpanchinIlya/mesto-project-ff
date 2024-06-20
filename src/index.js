import "./styles/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./cards.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const cardImage = document.querySelector(".card__image");

const popupClose = document.querySelector(".popup__close");

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function writeOneCard(card, deleteCallBackFunction) {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  const cardImage = cardTemplateClone.querySelector(".card__image");
  const cardDeleteButton = cardTemplateClone.querySelector(
    ".card__delete-button"
  );
  const cardTitle = cardTemplateClone.querySelector(".card__title");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardDeleteButton.addEventListener("click", deleteCallBackFunction);
  return cardTemplateClone;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

//@todo: Listeners

function popupAddOpenCloseEventListeners(buttonOpenClass, popupMainClass,popupIsOpenedClass,popupCloseClass) {

  const openButton = document.querySelector(buttonOpenClass);
  const popupMainDiv = document.querySelector(popupMainClass);
  const closeButton = document.querySelector(popupMainClass).querySelector(popupCloseClass);
  
  openButton.addEventListener("click", function () {
       popupMainDiv.classList.add(popupIsOpenedClass);
  });

  closeButton.addEventListener("click", function () {
    popupMainDiv.classList.remove(popupIsOpenedClass);
  });
}



// @todo: Вывести карточки на страницу
initialCards.forEach((item) =>
  placesList.append(writeOneCard(item, deleteCard))
);



popupAddOpenCloseEventListeners(".profile__edit-button", ".popup_type_edit","popup_is-opened",".popup__close");
popupAddOpenCloseEventListeners(".profile__add-button", ".popup_type_new-card","popup_is-opened",".popup__close");
