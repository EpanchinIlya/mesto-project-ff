import "./styles/index.css"; // добавьте импорт главного файла стилей

import { initialCards } from "./components/cards.js";
import {
  createCard,
  deleteCard,
  toggleLikeCallBackFunction,
} from "./components/card.js";
import {
  openModal,
  closeModal
} from "./components/modal.js";

import {
  enableValidation,
  clearValidation

} from "./components/validation.js";


import {
   getAllData,
   setUserInformation,
   setNewCard,
   deleteCardFromServer 

} from "./components/api.js";



const obj =
    {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        spanErrorClass:'.form__input-error',
        errorClass: 'popup__error_visible'
      }


const config = {
        baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
        headers: {
          authorization: '5f6c0717-61b9-4f4a-8c74-b03867a939b6',
          'Content-Type': 'application/json'
        }
      }
      



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

export { profileTitle, profileDescription };


// функции с запросами к серверу



// получаем  данные user и карточки
function readAllDataFromServer(config) {


 Promise.all(getAllData(config)).then((res) => {
    
 
  profileTitle.textContent = res[0].name;
  profileDescription.textContent = res[0].about;
  profileAvatar.src = res[0].avatar;
  addAllCards(res[1],res[0]._id);
  console.log(res);
  })
 .catch((err) => {
     console.log(`Ошибка. Запрос не выполнен: ${err}`);
   }
 )

}

//Обновление user data

function writeUserData(config, name, about){

  setUserInformation(config, name, about)
  .then((result) => {

    if((result.name === name)&&(result.about === about))   console.log("UserData записаны на сервер");
    else {console.log("UserData НЕ записаны");} 

    
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}

//Добавление новой карточки на сервер

function writeNewCard(config, card){

  setNewCard(config, card.name, card.link)
  .then((result) => {

    if((result.name === card.name)&&(result.link === card.link))   console.log("Card записана на сервер");
    else {console.log("Card НЕ записана на сервер");} 

    
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}


// удаление карточки

// function deleteCard(config, id){

//   setNewCard(config,id)
//   .then((result) => {
//         console.log(result);   
//   })
//   .catch((err) => {
//     console.log(err); // выводим ошибку в консоль
//   }); 



// }


readAllDataFromServer(config);








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

// Функция вывода всех карточек

function addAllCards(initialCards,userId) {
  initialCards.forEach((item) =>
    placesList.append(
      createCard(
        item,
        deleteCard,
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




// начинаем работать



// Вывод карточек

//addAllCards(initialCards);
addPopupOpenCloseEventListeners(".profile__edit-button", ".popup_type_edit");
addPopupOpenCloseEventListeners(".profile__add-button", ".popup_type_new-card");
addCallBackForImageClose();

//  обработка submit для формы изменения профиля
const formElementEditProfile = document.forms.edit_profile;

formElementEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = formElementEditProfile.name.value;
  profileDescription.textContent = formElementEditProfile.description.value;
  writeUserData(config, formElementEditProfile.name.value, formElementEditProfile.description.value);
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
  writeNewCard(config,card);
  formElementAddCard.reset();
  closeModal();
});


// Запуск валидации форм
enableValidation(obj);





///////////////////////////////




// getUserInformation(config);