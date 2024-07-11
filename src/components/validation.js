export { enableValidation, clearValidation };

// const obj =
//     {
//         formSelector: '.popup__form',
//         inputSelector: '.popup__input',
//         submitButtonSelector: '.popup__button',
//         inactiveButtonClass: 'popup__button_disabled',
//         inputErrorClass: 'popup__input_type_error',
//         errorClass: 'popup__error_visible'
//       }

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);

  if (inputElement.validity.patternMismatch)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  else inputElement.setCustomValidity("");

  if (!inputElement.validity.valid) {
    // showInputError
      inputElement.classList.add(inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(errorClass);
  } else {
    // hideInputError
      inputElement.classList.remove(inputErrorClass);
      errorElement.classList.remove(errorClass);
      errorElement.textContent = "";
  }
};

const enableValidation = (objVal) => {

  const formList = Array.from(document.querySelectorAll(objVal.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(
      formElement.querySelectorAll(objVal.inputSelector)
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(
          formElement,
          inputElement,
          objVal.inputErrorClass,
          objVal.errorClass
        );
        toggleButtonState(formElement, inputList, objVal);
      });
    });
  });
};



const toggleButtonState = (formElement, inputList, objVal) => {

  const buttonElement = formElement.querySelector(objVal.submitButtonSelector);

  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(objVal.inactiveButtonClass);
  } 
  else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(objVal.inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const clearValidation = (profileForm, objVal) => {
  const errorList = profileForm.querySelectorAll(objVal.spanErrorClass);
  errorList.forEach((item) => {
    item.textContent = "";
  });

  const inputList = profileForm.querySelectorAll(objVal.inputSelector);
  inputList.forEach((item) => {
    item.classList.remove(objVal.inputErrorClass);
  });

  const submitButton = profileForm.querySelector(objVal.submitButtonSelector);

  if (
    Array.from(inputList).every((item) => {
      return item.value.length > 0;
    })
  ) {
    submitButton.classList.remove(objVal.inactiveButtonClass);
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.classList.add(objVal.inactiveButtonClass);
    submitButton.setAttribute("disabled", true);
  }
};
