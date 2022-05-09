export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);

        console.log(popupSelector);
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popupSelector.classList.add('popup_opened');
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupSelector.classList.remove('popup_opened');
    }


    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }


    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });
    }
}