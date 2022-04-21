import { config } from './index.js';

// export default class FormValidator {
//   constructor(config, formElement) {
//     this._config = config;
//     this._formElement = formElement;
//     this._formList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
//     this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
//     this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
//   }

//   _showError(inputElement, errorMessage) {
//     const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(this._config.inputErrorClass);
//     formError.textContent = errorMessage;
//     formError.classList.add = (this._config.errorClass);
//   }

//   _hideError(inputElement) {
//     const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(this._config.inputErrorClass);
//     formError.classList.remove(this._config.errorClass);
//     formError.textContent = '';
//   }

//   // _checkInputValidity(inputElement) {
//   //   !inputElement.validity.valid ?
//   //     this._showError(inputElement, inputElement.validationMessage) :
//   //     this._hideError(inputElement);
//   // }

//   _checkInputValidity(inputElement) {
//     if (!inputElement.validity.valid) {
//       this._showInputError(inputElement, inputElement.validationMessage);
//     } else {
//       this._hideInputError(inputElement);
//     }
//   };

//   _hasInvalidInput() {
//     return this._inputList.some((inputElement) => {
//       return !inputElement.validity.valid;
//     });
//   }

//   _toggleButtonState() {
//     if (this._hasInvalidInput()) {
//       this._buttonElement.setAttribute('disabled', true);
//       this._buttonElement.classList.add(this._config.inactiveButtonClass);
//     } else {
//       this._buttonElement.setAttribute('disabled', false);
//       this._buttonElement.classList.remove(this._config.inactiveButtonClass);
//     }
//   }

//   _setEventListeners() {
//     this._toggleButtonState();
//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', () => {
//         this._checkInputValidity(inputElement);
//         this._toggleButtonState();
//       });
//     });
//   }

//   enableValidation() {
//     this._setEventListeners();
//   };
// }


// //function for showing errors
// const showError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass}) => {
//   const formError = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   formError.textContent = errorMessage;
//   formError.classList.add(errorClass);
// };

// //function for hiding errors
// const hideError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
//   const formError = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   formError.classList.remove(errorClass);
//   formError.textContent = '';
// };

// //function for checking validity
// const checkInputValidity = (formElement, inputElement, rest) => {
//   if (!inputElement.validity.valid) {
//     showError(formElement, inputElement, inputElement.validationMessage, rest);
//   } else {
//     hideError(formElement, inputElement, rest);
//   }
// };


// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// //function for changing the batton state
// const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.setAttribute('disabled', true)
//     buttonElement.classList.add(inactiveButtonClass);
//   } else {
//     buttonElement.removeAttribute('disabled');
//     buttonElement.classList.remove(inactiveButtonClass);
//   }
// }


// const setEventListeners = (formElement, {inputSelector,submitButtonSelector,inactiveButtonClass,...rest}) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, rest);
//       toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//     });
//   });
// };

// const enableValidation = ({formSelector, ...rest}) => {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, rest);
//   });
// };


// enableValidation({
//   formSelector: '.form',
//   inputSelector: '.form__input',
//   submitButtonSelector: '.form__submit',
//   inactiveButtonClass: 'form__submit_disabled',
//   inputErrorClass: 'form__error',
//   errorClass: 'form__error_active'
// });

