export {maimfunc};


const maimfunc = ()=>{


    const s = document.forms.edit_profile.querySelector(".popup__input_type_name")
    showInputError(document.forms.edit_profile,s,"yessss");



}


//проверяем две фнкции ниже и потом делаем кастомный error


const showInputError = (formElement, inputElement, errorMessage) => {
    // debugger
     const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
     inputElement.classList.add('form__input_type_error');
     errorElement.textContent = errorMessage;
     errorElement.classList.add('form__input-error_active');
    
    };
    
      
    
    const hideInputError = (formElement, inputElement) => {
    
     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
     inputElement.classList.remove('form__input_type_error');
     errorElement.classList.remove('form__input-error_active');
     errorElement.textContent = '';
    
    };
    
      
    
    const checkInputValidity = (formElement, inputElement) => {
    
     if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
     } else {
      hideInputError(formElement, inputElement);
     }
    };
    
      
    
    const setEventListeners = (formElement) => {
     const inputList = Array.from(formElement.querySelectorAll('.form__input'));
     inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      });
     });
    };
    

    // {
    //     formSelector: '.popup__form',
    //     inputSelector: '.popup__input',
    //     submitButtonSelector: '.popup__button',
    //     inactiveButtonClass: 'popup__button_disabled',
    //     inputErrorClass: 'popup__input_type_error',
    //     errorClass: 'popup__error_visible'
    //   }



    const  enableValidation = (objectValidation) =>{





      }