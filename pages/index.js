import Card from '../../scripts/components/Card.js';
import Section from '../../scripts/components/Section.js';
import PopupWithImage from '../../scripts/components/PopupWithImage.js';
import PopupWithForm from '../../scripts/components/PopupWithForm.js';
import UserInfo from '../../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import config from '../../scripts/utils/config.js';
import {
  initialCards
} from '../../scripts/utils/initialCards.js';
import {
  formElementEdit,
  formElementAdd,
  buttonEditProfile,
  buttonAddCard,
  cardsContainer,
  nameInput,
  aboutInput,
} from '../../scripts/utils/constants.js';


//validation of profile editing
const formEditValidator = new FormValidator(config, formElementEdit);
formEditValidator.enableValidation();

//validation of adding card
const formAddValidator = new FormValidator(config, formElementAdd);
formAddValidator.enableValidation();

//creating popup for showing images
const popupShowImage = new PopupWithImage('.popup_show');
popupShowImage.setEventListeners();

//creating card
const renderCard = (data) => {
  const card = new Card({
      data: data,
      handleCardClick: () => {
        popupShowImage.open(data);
      },
    },
    '.card-template'
  );
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  return cardElement;
}

//rendering cards
const section = new Section({
    items: initialCards.reverse(),
    renderer: renderCard
  },
  '.photo-grid');
section.renderItems();

//creating popup for adding cards
const popupAdd = new PopupWithForm('.popup_add', (cardData) => {
  const data = {
    name: cardData.place,
    link: cardData.link
  }
  section.addItem(renderCard(data));
  popupAdd.close();
});

popupAdd.setEventListeners();

//adding listener for open popup with add card form
buttonAddCard.addEventListener('click', () => {
  formAddValidator.resetErrors();
  formElementAdd.reset();
  popupAdd.open();
});


//creating user information object
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about'
});

//creating popup for editing profile info
const popupEdit = new PopupWithForm('.popup_edit', (data) => {
  profileInfo.setUserInfo(data);
  popupEdit.close();
});

popupEdit.setEventListeners();

//adding listener for open popup with edit form
buttonEditProfile.addEventListener('click', () => {
  const getProfileInfo = profileInfo.getUserInfo();

  nameInput.value = getProfileInfo.name;
  aboutInput.value = getProfileInfo.about;

  formEditValidator.resetErrors();
  popupEdit.open();
});