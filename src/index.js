import "./styles/index.css"; // добавьте импорт главного файла стилей
import { createCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getAllData,
  setUserInformation,
  setNewCard,
  deleteCardFromServer,
  addRemoveLikeCard,
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

export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-18",
  headers: {
    authorization: "5f6c0717-61b9-4f4a-8c74-b03867a939b6",
    "Content-Type": "application/json",
  },
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
const inputOne = popupTypeEdit.querySelector("input:nth-of-type(1)");
const inputTwo = popupTypeEdit.querySelector("input:nth-of-type(2)");
const deletePopup = document.querySelector(".popup_type_delete-card");

let idCardForDelete = 0;
let cardDeleteButton = undefined;

export { profileTitle, profileDescription };

// функции с запросами к серверу

// получаем  данные user и карточки
function readAllDataFromServer(config) {
  Promise.all(getAllData(config))
    .then((res) => {
      profileTitle.textContent = res[0].name;
      profileDescription.textContent = res[0].about;
      profileAvatar.src = res[0].avatar;
      profileAvatar.classList.add("profile__image-visible");
      addAllCards(res[1], res[0]._id);
      console.log(res);
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен: ${err}`);
    });
}

//Обновление user data

function writeUserData(config, name, about, buttonSummit) {
  buttonSummit.textContent = "Сохранение...";
  setUserInformation(config, name, about)
    .then((result) => {
      if (result.name === name && result.about === about)
        console.log("UserData записаны на сервер");
      else {
        console.log("UserData НЕ записаны");
      }
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      buttonSummit.textContent = "Сохранить";
      profileTitle.textContent = formElementEditProfile.name.value;
      profileDescription.textContent = formElementEditProfile.description.value;
      closeModal();
    });
}

//Добавление новой карточки на сервер

function writeNewCard(config, card, buttonSummit) {
  buttonSummit.textContent = "Сохранение...";
  setNewCard(config, card.name, card.link)
    .then((result) => {
      if (result.name === card.name && result.link === card.link) {
        card._id = result._id;
        console.log("Card записана на сервер");
      } else {
        console.log("Card НЕ записана на сервер");
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSummit.textContent = "Сохранить";
      addOneCard(card);
      closeModal();
    });
}



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
    clearValidation(popupMainDiv, obj);
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

  popupTypeImageСaption.textContent = title.textContent;
  popupTypeImageImage.alt = image.alt;
  popupTypeImageImage.src = image.src;
  openModal(popupTypeImage);
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
          idCardForDelete = 0;
        }
        console.log("Карточка удалена");
      } else {
        console.log("Карточка НЕ удалена");
      }
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      closeModal();
    });
});



//  обработка submit для формы изменения аватара
const formElementeditAvatar = document.forms.new_avatar;
const buttonSubmitEditAvatar = formElementeditAvatar.querySelector("button");

formElementeditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();

  buttonSubmitEditAvatar.textContent = "Сохранение...";
  setUserAvatar(config, formElementeditAvatar.avatar.value)
    .then((result) => {
      if (result.avatar === formElementeditAvatar.avatar.value) {
        profileAvatar.src = result.avatar;
      }
      console.log(result);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      buttonSubmitEditAvatar.textContent = "Сохранить";
      closeModal();
    });
});




// Функция переключения like карточки c запросом на сервер
function toggleLikeCallBackFunction(evt, card) {
  addRemoveLikeCard(
    config,
    card._id,
    !evt.target.classList.contains("card__like-button_is-active")
  )
    .then((result) => {
      if (result._id === card._id) {
        evt.target
          .closest(".card__description")
          .querySelector(".card__like-number").textContent =
          result.likes.length;
        evt.target.classList.toggle("card__like-button_is-active");
      }
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}



