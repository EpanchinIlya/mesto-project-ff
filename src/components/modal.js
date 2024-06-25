

export{popupCallBackFunction, openModal, closeModal, closePopup}


// @todo: Функция открытия/прорисовки/закрытия popup картинки по нажатию на кнопку

function popupCallBackFunction(evt) {
    const card = evt.target.closest(".card");
    const popup = document.querySelector(".popup_type_image");
    popup.querySelector(".popup__caption").textContent =
      card.querySelector(".card__title").textContent;
    popup.querySelector(".popup__image").alt =
      card.querySelector(".card__image").alt;
    popup.querySelector(".popup__image").src =
      card.querySelector(".card__image").src;
    popup.classList.add("popup_is-opened");
    AddpopupCloseToEscEventListeners();
    popup.querySelector(".popup__close").addEventListener("click", function () {
      popup.classList.remove("popup_is-opened");
      RemovepopupCloseToEscEventListeners();
    });
  }


 
 function openModal(popupMainDiv){

    popupMainDiv.classList.add("popup_is-opened");

   
    if (popupMainDiv.classList.contains('popup_type_edit')) {
      popupMainDiv.querySelector("input:nth-of-type(1)").value = document.querySelector(".profile__title").textContent;
      popupMainDiv.querySelector("input:nth-of-type(2)").value = document.querySelector(".profile__description").textContent;
    }

    AddpopupCloseToEscEventListeners();

 }


 function closeModal(popupMainDiv) {
    popupMainDiv.classList.remove("popup_is-opened");
    RemovepopupCloseToEscEventListeners();
  }


 
//@todo: Функции добавления / удаления слушателя закрытия по ESCkey

function AddpopupCloseToEscEventListeners(evt) {
    document.querySelector(".page").addEventListener("keydown", closePopupCallBack);
  
    // сделал отсрочку, иначе сразу же прилетал клик из основной формы
  
    setTimeout(function () {
      document.querySelector(".page").addEventListener("click", clickClosePopupCallBack);
    }, 50);
  }
  
  function RemovepopupCloseToEscEventListeners(evt) {
    document.querySelector(".page").removeEventListener("keydown", closePopupCallBack);
    document.querySelector(".page").removeEventListener("click", clickClosePopupCallBack);
  }
  
  // CallBack на Esc
  
  function closePopupCallBack(evt) {
    if (evt.key === "Escape") closePopup();
  }
  
  // CallBack на клик мимо popup
  
  function clickClosePopupCallBack(evt) {
    if (evt.target.closest(".popup__content") === null) closePopup();
  }
  
  function closePopup() {
    const pop = document.querySelector(".popup_is-opened");
    if (pop !== null) {
      pop.classList.remove("popup_is-opened");
      RemovepopupCloseToEscEventListeners();
    }
  }
  
  //===========================================================================================
  