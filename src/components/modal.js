export { openModal, closeModal, addPopupCloseToEscEventListeners };

const page = document.querySelector(".page");

function openModal(popupMainDiv) {
  popupMainDiv.classList.add("popup_is-opened");
  addPopupCloseToEscEventListeners();
  const form = popupMainDiv.querySelector(".popup__form");
  form.reset();
}

function closeModal() {
  const pop = document.querySelector(".popup_is-opened");

  if (pop !== null) {
    pop.classList.remove("popup_is-opened");
    removePopupCloseToEscEventListeners();
  }
}

// Функции добавления / удаления слушателя закрытия по ESCkey

function addPopupCloseToEscEventListeners() {
  page.addEventListener("keydown", closePopupOnClickOnEscCallBack);

  setTimeout(function () {
    page.addEventListener("click", closePopupOnClickOnОverlayCallBack);
  }, 50);
}

function removePopupCloseToEscEventListeners() {
  page.removeEventListener("keydown", closePopupOnClickOnEscCallBack);
  page.removeEventListener("click", closePopupOnClickOnОverlayCallBack);
}

// CallBack на Esc

function closePopupOnClickOnEscCallBack(evt) {
  if (evt.key === "Escape") closeModal();
}

// CallBack на клик мимо popup

function closePopupOnClickOnОverlayCallBack(evt) {
  if (evt.target.closest(".popup__content") === null) closeModal();
}

//===========================================================================================
