export {
  openModal,
  closeModal,
  addpopupCloseToEscEventListeners,
  removepopupCloseToEscEventListeners,
};
import { profile__title, profile__description } from "../index.js";

const popup_type_edit = document.querySelector(".popup_type_edit");
const input_one = popup_type_edit.querySelector("input:nth-of-type(1)");
const input_two = popup_type_edit.querySelector("input:nth-of-type(2)");

const page = document.querySelector(".page");

function openModal(popupMainDiv) {
  popupMainDiv.classList.add("popup_is-opened");

  if (popupMainDiv.classList.contains("popup_type_edit")) {
    input_one.value = profile__title.textContent;
    input_two.value = profile__description.textContent;
  }
  addpopupCloseToEscEventListeners();
}

function closeModal() {
  const pop = document.querySelector(".popup_is-opened");
  if (pop !== null) {
    pop.classList.remove("popup_is-opened");
    removepopupCloseToEscEventListeners();
  }
}

// Функции добавления / удаления слушателя закрытия по ESCkey

function addpopupCloseToEscEventListeners() {
  page.addEventListener("keydown", closePopupOnClickOnEscCallBack);
  setTimeout(function () {
    page.addEventListener("click", closePopupOnClickOnОverlayCallBack);
  }, 50);
}

function removepopupCloseToEscEventListeners(evt) {
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
