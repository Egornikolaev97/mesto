import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Api from '../scripts/components/Api.js';
import config from '../scripts/utils/config.js';
import {
  formElementEdit,
  formElementAdd,
  buttonEditProfile,
  buttonAddCard,
  nameInput,
  aboutInput,
} from '../scripts/utils/constants.js';
import './index.css';


//validation of profile editing
const formEditValidator = new FormValidator(config, formElementEdit);
formEditValidator.enableValidation();

//validation of adding card
const formAddValidator = new FormValidator(config, formElementAdd);
formAddValidator.enableValidation();

//creating popup for showing images
const popupShowImage = new PopupWithImage('.popup_show');
popupShowImage.setEventListeners();

// class Api//

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41/',
  headers: {
    authorization: 'a189a246-afb4-4f3e-9a38-c42b77769c95',
    'Content-Type': 'application/json',
  },
});


//creating card
// const renderCard = (data) => {
//   const card = new Card({
//       data: data,
//       handleCardClick: () => {
//         popupShowImage.open(data);
//       },
//     },
//     '.card-template'
//   );
//   const cardElement = card.generateCard()
//   return cardElement;
// };





// const renderCard = (data, userId) => {
//   const card = new Card({
//       data: data,
//       handleCardClick: () => {
//         popupShowImage.open(data);
//       },
//       handleLikeClick: () => {
//         api.setLike(data._id).
//         then(({res}) => {
//             card.setLike(res.likes)
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       },
//       handleRemoveLike: () => {
//         api.dislike(data._id).
//         then(({res}) => {
//             card.setLike(res.likes)
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     },
//     '.card-template',
//     userId
//   );
//   const cardElement = card.generateCard()
//   return cardElement;
// }



const renderCard = (data) => {
  const card = new Card({
     data: data,
     userId: userId,
     handleCardClick: () => {
       popupShowImage.open(data);
      },
       handleLikeClick: () => {
         if(card.isLiked()) {
           api.dislike(data._id)
           .then((res) => {
             card.setLikes(res.likes);
           })
           .catch((err) => {console.log(err)})
         } else {
           api.addLike(data._id)
           .then((res) => {
             card.setLikes(res.likes);
           })
           .catch((err) => {console.log(err)});
         }
  }
},
'.card-template'
);
  const cardElement = card.generateCard()
  return cardElement;
};

const section = new Section({
  renderer: renderCard
}, '.photo-grid');

//creating popup for adding cards
const popupAdd = new PopupWithForm('.popup_add', (cardData) => {
  const data = {
    name: cardData.place,
    link: cardData.link
  };
  api
    .addCard(data)
    .then((data) => {
      section.addItem(renderCard(data));
      popupAdd.close();
    }).catch((err) => {
      console.log(`Ошибка добавление карточки ${err}`)
    });
});

popupAdd.setEventListeners();

//adding listener for open popup with add card form
buttonAddCard.addEventListener('click', () => {
  formAddValidator.resetErrors();
  popupAdd.open();
});


//creating user information object
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about'
});

const popupEdit = new PopupWithForm('.popup_edit', (data) => {
  api.
  editUserInfo(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
      popupEdit.close();
    })
    .catch((err) => {
      alert('ERROR')
      console.log(err)
    });
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


popupEdit.setEventListeners();

//adding listener for open popup with edit form
buttonEditProfile.addEventListener('click', () => {
  const getProfileInfo = profileInfo.getUserInfo();

  nameInput.value = getProfileInfo.name;
  aboutInput.value = getProfileInfo.about;

  formEditValidator.resetErrors();
  popupEdit.open();
});

///////////////////////

// const popupAvatarButton = document.querySelector('.profile__avatar-btn');
// const popupAvatar = document.querySelector('.popup_avatar');
// const closeAvatar = document.querySelector('.popup__close-avatar');
// const popupDelete = document.querySelector('.popup_delete');
// const popupDeleteOpen = document.querySelector('.deletebutton');
// const closeDelete = document.querySelector('.popup__close-delete');


// function openPopup(popup) {
//   popup.classList.add('popup_opened');
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
// }

// popupAvatarButton.addEventListener('click', () => {
//   openPopup(popupAvatar);
// });

// closeAvatar.addEventListener('click', () => {
//   closePopup(popupAvatar);
// });

// popupDeleteOpen.addEventListener('click', () => {
//   openPopup(popupDelete);
// });

// closeDelete.addEventListener('click', () => {
//   closePopup(popupDelete);
// });