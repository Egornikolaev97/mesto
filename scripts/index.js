import Card from './Card.js';
export {imageDescription, imagePopup, popupShow, popupOpen};

//popups
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupShow = document.querySelector('.popup_show');
const popupAll = document.querySelectorAll('.popup');
//popups button
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddCard = document.querySelector('.profile__add-btn');
//cards
const cardsContainer = document.querySelector('.photo-grid');
//form elements
const formElementEdit = document.querySelector('.form_profile-edit');
const formElementAdd = document.querySelector('.form_cards-add');
//submit button
const buttonSubmit = document.querySelector('.form__submit_type-add');
//input elements for edit profile popup
const nameInput = formElementEdit.querySelector('.form__input_type_name');
const aboutInput = formElementEdit.querySelector('.form__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
//input elements for add cards popup
const cardNameInput = popupAdd.querySelector('.form__input_type_title');
const cardLinkInput = popupAdd.querySelector('.form__input_type_link');
//for show image
const imagePopup = popupShow.querySelector('.popup__image');
const imageDescription = popupShow.querySelector('.popup__description');

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//function for opening popups
function popupOpen(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', hadnleEscUp);
}

//function for closing popups
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', hadnleEscUp);
}

//fucntion for closing popup with the escape
function hadnleEscUp(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
}
//
popupAll.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});


function handleProfileFormEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEdit);
}

function handleProfileFormAdd(evt) {
  evt.preventDefault();
  const data = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  renderCard(data);
  closePopup(popupAdd);
};


// function for deleting errors
function deleteErrors(popup) {
  // popupErrors = popup.querySelectorAll('.form__input');
  // popupErrorsActive = popup.querySelectorAll('.form__error_active');

  popup.querySelectorAll('.form__input').forEach((inputElement) => {
    inputElement.classList.remove('form__error');
  });

  popup.querySelectorAll('.form__error_active').forEach((formError) => {
    formError.classList.remove('form__active');
    formError.textContent = '';
  });
}

//listeners
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  deleteErrors(popupEdit);
  popupOpen(popupEdit);
});

buttonAddCard.addEventListener('click', () => {
  formElementAdd.reset();
  buttonSubmit.setAttribute('disabled', true);
  buttonSubmit.classList.add('form__submit_disabled');
  deleteErrors(popupAdd);
  popupOpen(popupAdd);
});

formElementEdit.addEventListener('submit', handleProfileFormEdit);
formElementAdd.addEventListener('submit', handleProfileFormAdd);



function renderCard(data) {
  const addNewCard = new Card(data, '.card-template')
  const cardElement = addNewCard.generateCard();

  cardsContainer.prepend(cardElement);
}

initialCards.reverse().forEach((card) => {
  renderCard(card);
});

