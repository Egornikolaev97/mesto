export default class FormValidator {
    constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
      this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _showError(inputElement, errorMessage) {
      const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._config.inputErrorClass);
      formError.classList.add(this._config.errorClass);
      formError.textContent = errorMessage;

    }

    _hideError(inputElement) {
      const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._config.inputErrorClass);
      formError.classList.remove(this._config.errorClass);
      formError.textContent = '';
    }

    _checkInputValidity(inputElement) {
       !inputElement.validity.valid
       ? this._showError(inputElement, inputElement.validationMessage)
       : this._hideError(inputElement);
    }

    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }

    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
      } else {
        this._buttonElement.removeAttribute('disabled', false);
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      }
    }

    _setEventListeners() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });

      this._formElement.addEventListener('submit', (event) => {
        event.preventDefault();
      });
    };

    enableValidation() {
      this._setEventListeners();
    };
  }