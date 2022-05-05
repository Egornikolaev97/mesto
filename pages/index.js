import Card from '../../scripts/componentns/Card.js';
import Section from '../../scripts/componentns/Section.js';
import FormValidator from '../scripts/componentns/FormValidator.js';
import { openPopup, closePopup } from '../scripts/utils/utils.js';
import { initialCards } from '../../scripts/utils/initialCards.js';
export { openPopup };

//popups
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupShow = document.querySelector('.popup_show');
const popupAll = document.querySelectorAll('.popup');
//popups buttonz
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddCard = document.querySelector('.profile__add-btn');
//cards
const cardsContainer = document.querySelector('.photo-grid');
//form elements
const formElementEdit = document.querySelector('.form_profile-edit');
const formElementAdd = document.querySelector('.form_cards-add');
//input elements for edit profile popup
const nameInput = formElementEdit.querySelector('.form__input_type_name');
const aboutInput = formElementEdit.querySelector('.form__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
//input elements for add cards popup
const cardNameInput = popupAdd.querySelector('.form__input_type_title');
const cardLinkInput = popupAdd.querySelector('.form__input_type_link');

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type-error',
  errorClass: 'form__error_active'
};

//validation of profile editing
const formEditValidator = new FormValidator(config, popupEdit);
formEditValidator.enableValidation();

//validation of adding card
const formAddValidator  = new FormValidator(config, popupAdd);
formAddValidator.enableValidation();

//fucntion for closing popup with the escape
function hadnleEscUp(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
}

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

//function for rendering new cards
function renderCard(data) {
  const addNewCard = new Card(data, '.card-template')
  const cardElement = addNewCard.generateCard();

  cardsContainer.prepend(cardElement);
}

initialCards.reverse().forEach((card) => {
  renderCard(card);
});

//listeners
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  formEditValidator.resetErrors();
  openPopup(popupEdit);
});

buttonAddCard.addEventListener('click', () => {
  formElementAdd.reset();
  formAddValidator.resetErrors();
  openPopup(popupAdd);
});

formElementEdit.addEventListener('submit', handleProfileFormEdit);
formElementAdd.addEventListener('submit', handleProfileFormAdd);