export { createCard, deleteCard, toggleLikeCallBackFunction };

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// создание карточки

function createCard(
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

//  Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

// Функция like карточки

function toggleLikeCallBackFunction(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
