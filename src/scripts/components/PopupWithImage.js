import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopup = document.querySelector('.popup__image');
        this._imageDescription = document.querySelector('.popup__description');
    }

    open(data) {
        this._imageDescription.textContent = data.name;
        this._imagePopup.alt = data.name;
        this._imagePopup.src = data.link;

        super.open();
    }
}
