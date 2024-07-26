const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (inputElement.validity.patternMismatch)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  else inputElement.setCustomValidity("");

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const showInputError = (
  formElement,
  inputElement,
  inputValidationMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputValidationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
  inputElement.setCustomValidity("");
};

const enableValidation = (objVal) => {
  const formList = Array.from(document.querySelectorAll(objVal.formSelector));

  formList.forEach((formElement) => {
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
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(objVal.inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const clearValidation = (formDiv, objVal) => {
  const inputList = Array.from(formDiv.querySelectorAll(objVal.inputSelector));
  inputList.forEach((item) => {
    hideInputError(formDiv, item, objVal.inputErrorClass, objVal.errorClass);
  });

  toggleButtonState(formDiv, inputList, objVal);
};

export { enableValidation, clearValidation };
