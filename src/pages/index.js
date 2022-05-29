import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Api from '../scripts/components/Api.js';
import config from '../scripts/utils/config.js';
import {
  formElementEdit,
  formElementAdd,
  formElementAvatar,
  buttonEditProfile,
  buttonAddCard,
  buttonAvatarEdit,
  nameInput,
  aboutInput,
  avatar,
} from '../scripts/utils/constants.js';
import './index.css';


//class Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41/',
  headers: {
    authorization: 'a189a246-afb4-4f3e-9a38-c42b77769c95',
    'Content-Type': 'application/json',
  },
});

let userId;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, userCard]) => {
    profileInfo.setUserInfo(userData);
    userId = userData._id;
    section.renderItems(userCard);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

//creating user information object
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar',
});

//rendering cards
const renderCard = (data) => {
  const card = new Card({
      data: data,
      userId: userId,

      handleCardClick: () => {
        popupShowImage.open(data);
      },

      handleLikeClick: () => {
        if (card.isLiked()) {
          api.dislike(data._id)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            })
        } else {
          api.addLike(data._id)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        }
      },

      handleDeleteClick: () => {
        popupDelete.open();
        popupDelete.submitCallBack(() => {
          api.deleteCard(data._id)
          .then(() => {
            popupDelete.close();
            card.removeCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
        });
      }
    },
    '.card-template'
  );
  const cardElement = card.generateCard()
  return cardElement;
};

const section = new Section({renderer: renderCard}, '.photo-grid');


//creating popup for adding cards
const popupAdd = new PopupWithForm('.popup_add', (cardData) => {
  popupAdd.loading(true);
  const data = {
    name: cardData.place,
    link: cardData.link
  };
  api.addCard(data)
    .then((data) => {
      section.addItem(renderCard(data));
      popupAdd.close();
    }).catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupAdd.loading(false);
    })
});

//creating popup for edditing avatar
const popupAvatar = new PopupWithForm(
  '.popup_avatar',
  (data) => {
    popupAvatar.loading(true);
  api.editAvatar(data).
  then((data) => {
    avatar.src = data.avatar;
    popupAvatar.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    popupAvatar.loading(false)
  })
});

//creating popup for editing profile info
const popupEdit = new PopupWithForm(
  '.popup_edit',
   (data) => {
     popupEdit.loading(true);
  api.editUserInfo(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEdit.loading(false)
    })
});

//creating popup for confirmation deleting
const popupDelete = new PopupWithSubmit('.popup_delete');
//creating popup for showing images
const popupShowImage = new PopupWithImage('.popup_show');


//setEventListeners
popupAdd.setEventListeners();
popupAvatar.setEventListeners();
popupEdit.setEventListeners();
popupShowImage.setEventListeners();
popupDelete.setEventListeners();


//validation of profile editing
const formEditValidator = new FormValidator(config, formElementEdit);
formEditValidator.enableValidation();

//validation of adding card
const formAddValidator = new FormValidator(config, formElementAdd);
formAddValidator.enableValidation();
//validation of editing avatar
const formAvatarlidator = new FormValidator(config, formElementAvatar);
formAvatarlidator.enableValidation();


//listeners
buttonEditProfile.addEventListener('click', () => {
  const getProfileInfo = profileInfo.getUserInfo();

  nameInput.value = getProfileInfo.name;
  aboutInput.value = getProfileInfo.about;

  formEditValidator.resetErrors();
  popupEdit.open();
});

buttonAddCard.addEventListener('click', () => {
  formAddValidator.resetErrors();
  popupAdd.open();
});

buttonAvatarEdit.addEventListener('click', () => {
  formAvatarlidator.resetErrors();
  popupAvatar.open();
});