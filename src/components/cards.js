

export{initialCards,cardView, addOneCard}
import { popupCallBackFunction} from "./modal.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];


// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// создание карточки

function writeOneCard(
  card,
  deleteCallBackFunction,
  likeCallBackFunction,
  popupCallBackFunction
) {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  const cardImage = cardTemplateClone.querySelector(".card__image");
  const cardDeleteButton = cardTemplateClone.querySelector(
    ".card__delete-button"
  );
  const cardLikeButton = cardTemplateClone.querySelector(".card__like-button");
  const cardTitle = cardTemplateClone.querySelector(".card__title");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardDeleteButton.addEventListener("click", deleteCallBackFunction);
  cardLikeButton.addEventListener("click", likeCallBackFunction);
  cardImage.addEventListener("click", popupCallBackFunction);
  return cardTemplateClone;
}

// вывод карточек 

function cardView(placesList,initialCards) {
  initialCards.forEach((item) =>
    placesList.append(
      writeOneCard(
        item,
        deleteCard,
        likeCallBackFunction,
        popupCallBackFunction
      )
    )
  );
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

// @todo: Функция like карточки

function likeCallBackFunction(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}



function addOneCard(card,placesList){
placesList.prepend( writeOneCard(card, deleteCard, likeCallBackFunction, popupCallBackFunction)
);}