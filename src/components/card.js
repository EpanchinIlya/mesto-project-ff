export { createCard };

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
    likeCallBackFunction(evt, card);
  });
  cardImage.addEventListener("click", popupCallBackFunction);
  return cardTemplateClone;
}
