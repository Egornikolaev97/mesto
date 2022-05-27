import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._popupConfirmButton = this._popupSelector.querySelector('.form__submit-type-confirm');
        this._handleSubmit = handleSubmit
    }

    submitCallBack(newSubmit) {
        this._handleSubmit = newSubmit;
    }


    setEventListeners() {
        super.setEventListeners();
        this._popupConfirmButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        });
    }
}