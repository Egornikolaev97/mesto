export default class Card {
    constructor({data, handleCardClick}, cardSelector) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.photo-grid__item')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._buttonLike = this._element.querySelector('.photo-grid__like');
        this._buttonDelete = this._element.querySelector('.photo-grid__delete');
        this._buttonShowImage = this._element.querySelector('.photo-grid__show-btn');

        const cardName = this._element.querySelector('.photo-grid__title');
        const cardImage = this._element.querySelector('.photo-grid__image');

        cardName.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => {
            this._handleCardLike();
        });
        this._buttonDelete.addEventListener('click', () => {
            this._handleCardDelete();
        });
        this._buttonShowImage.addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    _handleCardLike() {
        this._buttonLike.classList.toggle('photo-grid__like-active');
    }

    _handleCardDelete() {
        this._element.remove();
        this._element = null;
    }
}