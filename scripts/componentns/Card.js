import { imageDescription, imagePopup, popupShow, openPopup } from "../utils/utils.js";

export default class Card {
    constructor(data, cardSelector) {
        this._title = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.photo-grid__item').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._buttonLike = this._element.querySelector('.photo-grid__like');
        this._buttonDelete = this._element.querySelector('.photo-grid__delete');
        this._buttonShowImage = this._element.querySelector('.photo-grid__show-btn');

        const cardName = this._element.querySelector('.photo-grid__title');
        const cardImage = this._element.querySelector('.photo-grid__image');

        cardName.textContent = this._title;
        cardImage.src = this._link;
        cardImage.alt = this._alt;

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => {
            this._clickButtonLike();
        });
        this._buttonDelete.addEventListener('click', () => {
            this._clickButtonDelete();
        });
        this._buttonShowImage.addEventListener('click', () => {
            this._clickButtonShowImage();
        });
    }

    _clickButtonLike() {
        this._buttonLike.classList.toggle('photo-grid__like-active');
    }

    _clickButtonDelete() {
        this._element.remove();
        this._element = null;
    }

    _clickButtonShowImage() {
        imageDescription.textContent = this._title;
        imagePopup.alt = this._alt;
        imagePopup.src = this._link;
        openPopup(popupShow);
    }
}