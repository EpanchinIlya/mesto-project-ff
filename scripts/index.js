// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function writeOneCard(card, deleteCallBackFunction) {

  const cardTemplateClone = cardTemplate.cloneNode(true);
  const cardImage = cardTemplateClone.querySelector('.card__image');
  const cardDeleteButton = cardTemplateClone.querySelector('.card__delete-button');
  const cardTitle = cardTemplateClone.querySelector('.card__title');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardDeleteButton.addEventListener('click', deleteCallBackFunction);
  return cardTemplateClone;
}

// @todo: Функция удаления карточки


function deleteCard(evt) {

  evt.target.closest('.places__item').remove();
}


// @todo: Вывести карточки на страницу

initialCards.forEach(item => placesList.append(writeOneCard(item, deleteCard)));
