export default class Card {
    constructor( {data, handleCardClick, handleLikeClick, handleDeleteClick, userId}, cardSelector) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.photo-grid__item')
        .cloneNode(true);

        return cardElement;
    }


    isLiked() {
      return this._likes.some(item => item._id === this._userId);
    }

    _enableLike() {
      this._element.querySelector('.photo-grid__like').classList.add('photo-grid__like-active');
    }

    _disableLike() {
      this._element.querySelector('.photo-grid__like').classList.remove('photo-grid__like-active');
    }

    setLikes(setNewLike) {
      this._likes = setNewLike;
      this._likesCounter.textContent = this._likes.length;


      if (this.isLiked()) {
        this._enableLike();
      } else {
        this._disableLike();
      }
    }

    removeLike() {
      this._likesCounter.textContent = this._likes.length;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._buttonCardDelete = this._element.querySelector('.photo-grid__delete');
        this._buttonShowImage = this._element.querySelector('.photo-grid__show-btn');
        this._buttonLike = this._element.querySelector('.photo-grid__like');
        this._likesCounter = this._element.querySelector('.photo-grid__like-counter');


        const cardName = this._element.querySelector('.photo-grid__title');
        const cardImage = this._element.querySelector('.photo-grid__image');

        cardName.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;

        if(this._ownerId !== this._userId) {
          this._buttonCardDelete.remove();
        }


        this.setLikes(this._likes);
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => {
          this._handleLikeClick(this._id);
        })
        this._buttonCardDelete.addEventListener('click', () => {
            this._handleDeleteClick(this._id);
        });
        this._buttonShowImage.addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    removeCard() {
      this._element.remove();
      this._element = null;
    }
}