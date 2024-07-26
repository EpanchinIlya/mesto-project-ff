import "./styles/index.css"; // добавьте импорт главного файла стилей
import {
  createCard,
  toggleLikeCallBackFunction,
  config,
} from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getAllData,
  setUserInformation,
  setNewCard,
  deleteCardFromServer,
  setUserAvatar,
} from "./components/api.js";

const obj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  spanErrorClass: ".form__input-error",
  errorClass: "popup__error_visible",
};

//  DOM узлы

const placesList = document.querySelector(".places__list");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeImageСaption = popupTypeImage.querySelector(".popup__caption");
const popupTypeImageImage = popupTypeImage.querySelector(".popup__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const inputNameProfile = popupTypeEdit.querySelector("input:nth-of-type(1)");
const inputDescriptionProfile = popupTypeEdit.querySelector(
  "input:nth-of-type(2)"
);
const deletePopup = document.querySelector(".popup_type_delete-card");

let idCardForDelete = 0;
let cardDeleteButton = undefined;

// функции с запросами к серверу

// получаем  данные user и карточки
function readAllDataFromServer(config) {
  Promise.all(getAllData(config))
    .then((res) => {
      const [user, cards] = res;
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      profileAvatar.src = user.avatar;
      profileAvatar.classList.add("profile__image-visible");
      addAllCards(cards, user._id);
      console.log(res);
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен: ${err}`);
    });
}

//Обновление user data

function writeUserData(config, name, about, buttonSummit) {
  writeTextOfButton(buttonSummit, "Сохранение...");
  setUserInformation(config, name, about)
    .then((result) => {
      if (result.name === name && result.about === about) {
        profileTitle.textContent = result.name;
        profileDescription.textContent = result.about;
        closeModal();
        console.log("UserData записаны на сервер");
      } else {
        console.log("UserData НЕ записаны");
      }
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      writeTextOfButton(buttonSummit, "Сохранить");
    });
}

//Добавление новой карточки на сервер

function writeNewCard(config, card, buttonSummit) {
  writeTextOfButton(buttonSummit, "Сохранение...");
  setNewCard(config, card.name, card.link)
    .then((result) => {
      if (result.name === card.name && result.link === card.link) {
        card._id = result._id;
        addOneCard(card);
        closeModal();
        console.log("Card записана на сервер");
      } else {
        console.log("Card НЕ записана на сервер");
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      writeTextOfButton(buttonSummit, "Сохранить");
    });
}

function writeTextOfButton(button, text) {
  button.textContent = text;
}

// Функция добавления слушателя открытия  и закрытия popup по кнопкам

function addPopupOpenCloseEventListeners(buttonOpenClass, popupMainClass) {
  const openButton = document.querySelector(buttonOpenClass);
  const popupMainDiv = document.querySelector(popupMainClass);
  const closeButton = popupMainDiv.querySelector(".popup__close");
  const form = popupMainDiv.querySelector(".popup__form");

  openButton.addEventListener("click", function () {
    if (form !== undefined) form.reset();
    openModal(popupMainDiv);
    clearValidation(popupMainDiv, obj);

    if (popupMainDiv.classList.contains("popup_type_edit")) {
      inputNameProfile.value = profileTitle.textContent;
      inputDescriptionProfile.value = profileDescription.textContent;
    }
  });

  closeButton.addEventListener("click", function () {
    closeModal();
  });
}

// Функция добавления слушателя закрытия popup удаления карточки

function deletePopupCloseEventListener() {
  const closeButton = deletePopup.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    closeModal();
  });
}

//  Функция удаления карточки

function openPopupDeleteCard(DeleteButtonInCard, card) {
  idCardForDelete = card._id;
  cardDeleteButton = DeleteButtonInCard;
  openModal(deletePopup);
}

// Функция вывода всех карточек в DOM

function addAllCards(initialCards, userId) {
  initialCards.forEach((item) =>
    placesList.append(
      createCard(
        item,
        openPopupDeleteCard,
        toggleLikeCallBackFunction,
        createPopupCallBackFunction,
        userId
      )
    )
  );
}

// Добавление одной карочки в начало DOM

function addOneCard(card) {
  placesList.prepend(
    createCard(
      card,
      openPopupDeleteCard,
      toggleLikeCallBackFunction,
      createPopupCallBackFunction,
      0
    )
  );
}

// Функция открытия/прорисовки/закрытия popup картинки по нажатию на картинку

function createPopupCallBackFunction(evt) {
  const card = evt.target.closest(".card");
  const image = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");

  openModal(popupTypeImage);
  popupTypeImageСaption.textContent = title.textContent;
  popupTypeImageImage.alt = image.alt;
  popupTypeImageImage.src = image.src;
}

function addCallBackForImageClose() {
  const imgClose = popupTypeImage.querySelector(".popup__close");
  imgClose.addEventListener("click", closeModal);
}

// MAIN

readAllDataFromServer(config);
addPopupOpenCloseEventListeners(".profile__edit-button", ".popup_type_edit");
addPopupOpenCloseEventListeners(".profile__add-button", ".popup_type_new-card");
addPopupOpenCloseEventListeners(".avatar", ".popup_type_new-avatar");
deletePopupCloseEventListener();
addCallBackForImageClose();

// Запуск валидации форм
enableValidation(obj);

// END MAIN

// обработка submit-ов

//  обработка submit для формы изменения профиля
const formElementEditProfile = document.forms.edit_profile;
const buttonSubmitEditProfile = formElementEditProfile.querySelector("button");

formElementEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  writeUserData(
    config,
    formElementEditProfile.name.value,
    formElementEditProfile.description.value,
    buttonSubmitEditProfile
  );
});

//  обработка submit для формы добавления карточки
const formElementAddCard = document.forms.new_place;
const buttonSubmitAddCard = formElementAddCard.querySelector("button");

formElementAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const card = {
    name: formElementAddCard.place_name.value,
    link: formElementAddCard.link.value,
    _id: "",
  };
  writeNewCard(config, card, buttonSubmitAddCard);
});

//  обработка submit  подтверждения удаления карточки
const formElementDeleteCard = document.forms.delete_card;

formElementDeleteCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  deleteCardFromServer(config, idCardForDelete)
    .then((result) => {
      if (result.message === "Пост удалён") {
        if (cardDeleteButton !== undefined) {
          cardDeleteButton.closest(".places__item").remove();
          closeModal();
          idCardForDelete = 0;
        }
        console.log("Карточка удалена");
      } else {
        console.log("Карточка НЕ удалена");
      }
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
});

//  обработка submit для формы изменения аватара
const formElementeditAvatar = document.forms.new_avatar;
const buttonSubmitEditAvatar = formElementeditAvatar.querySelector("button");

formElementeditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  writeTextOfButton(buttonSubmitEditAvatar, "Сохранение...");
  setUserAvatar(config, formElementeditAvatar.avatar.value)
    .then((result) => {
      if (result.avatar === formElementeditAvatar.avatar.value) {
        profileAvatar.src = result.avatar;
        closeModal();
      }
      console.log(result);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      writeTextOfButton(buttonSubmitEditAvatar, "Сохранить");
    });
});
