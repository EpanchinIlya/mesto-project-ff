import "./styles/index.css"; // добавьте импорт главного файла стилей
import { initialCards,cardView,addOneCard } from "./components/cards.js";
import { openModal,closeModal, closePopup } from "./components/modal.js";



// @todo: DOM узлы

const placesList = document.querySelector(".places__list");


//@todo: Функция добавления слушателя открытия  и закрытия popup по кнопкам 

function popupAddOpenCloseEventListeners(buttonOpenClass,popupMainClass) {

  const openButton = document.querySelector(buttonOpenClass);
  const popupMainDiv = document.querySelector(popupMainClass);
  const closeButton = document.querySelector(popupMainClass).querySelector(".popup__close");

  openButton.addEventListener("click",function(){ openModal(popupMainDiv);});
  closeButton.addEventListener("click",function(){ closeModal(popupMainDiv)});
}


// вывод карточек
cardView(placesList,initialCards);

popupAddOpenCloseEventListeners(".profile__edit-button",".popup_type_edit");
popupAddOpenCloseEventListeners(".profile__add-button",".popup_type_new-card");




// @todo: обработка submit для формы изменения профиля
const formElementEditProfile = document.forms.edit_profile;

formElementEditProfile.addEventListener("submit",(evt)=>{

  evt.preventDefault();
  document.querySelector(".profile__title").textContent =       formElementEditProfile.name.value;
  document.querySelector(".profile__description").textContent = formElementEditProfile.description.value;
  closePopup();
});

///////////////////////////////

// @todo: обработка submit для формы добавления карточки
const formElementAddCard = document.forms.new_place;
formElementAddCard.addEventListener("submit",(evt) =>{ 
  
  evt.preventDefault();


  const card = {name: formElementAddCard.place_name.value,
                link: formElementAddCard.link.value,
  };

  addOneCard(card,placesList);
  formElementAddCard.place_name.value = "";
  formElementAddCard.link.value = "";
  closePopup();});

///////////////////////////////
