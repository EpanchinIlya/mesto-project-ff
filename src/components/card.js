export { createCard, deleteCard, toggleLikeCallBackFunction };

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;
let idCardForDelete = 0;
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
  const cardDeleteButton = cardTemplateClone.querySelector(".card__delete-button");
  const cardLikeButton = cardTemplateClone.querySelector(".card__like-button");
  const cardLikeNumber = cardTemplateClone.querySelector(".card__like-number");
  const cardTitle = cardTemplateClone.querySelector(".card__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikeNumber.textContent = card.likes.length;

  if(card.owner._id === userId) {
    cardDeleteButton.classList.remove("card__delete-button_hidden");
    cardDeleteButton.addEventListener("click",//(card)=>{ 
      
     // idCardForDelete = card._id;
      deleteCallBackFunction);

  }
 
  cardLikeButton.addEventListener("click", likeCallBackFunction);
  cardImage.addEventListener("click", popupCallBackFunction);
  return cardTemplateClone;
}

//  Функция удаления карточки

function deleteCard(evt) {
  debugger
  evt.target.closest(".places__item").remove();

 // deleteCardFromServer
}

// Функция like карточки

function toggleLikeCallBackFunction(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
