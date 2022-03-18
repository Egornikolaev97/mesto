//popups
const editProfile = document.querySelector('.profile__edit-btn');
const addCards = document.querySelector('.profile__add-btn');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
//popups close
const closePopup = popupEdit.querySelector('.popup__close');
const closePopupAdd = popupAdd.querySelector('.popup__close');
const closePopupShow = document.querySelector('.popup__close-full');
//popups sumbit button
const sumbitEdit = document.querySelector('form__submit_type-edit');
const sumbitAdd = document.querySelector('form__submit_type-add');

const formElementEdit = document.querySelector('.form_profile-edit');
const formElementAdd = document.querySelector('.form_cards-add');

const nameInput = formElementEdit.querySelector('.form__input_type_name');
const aboutInput = formElementEdit.querySelector('.form__input_type_about');
const submit = formElementEdit.querySelector('.form__submit');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const cardNameInput = popupAdd.querySelector('.form__input_type_title');
const cardLinkInput = popupAdd.querySelector('.form__input_type_link');

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


function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

editProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  popupOpen(popupEdit);
});

addCards.addEventListener('click', () => {
  popupOpen(popupAdd);
});






// function popupEditOpen() {
//   popupEdit.classList.add('popup_opened');
//   nameInput.value = profileName.textContent;
//   aboutInput.value = profileAbout.textContent;
// }

// function popupAddOpen() {
//   popupAdd.classList.add('popup_opened');
// }

function popupCloseEdit() {
  popupEdit.classList.remove('popup_opened');
}

function popupCloseAdd() {
  popupAdd.classList.remove('popup_opened');
}


function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  popupCloseEdit();
}

function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  const data = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  renderCard(data);
  popupCloseAdd();
}

// addCards.addEventListener('click', popupAddOpen);
// editProfile.addEventListener('click', popupEditOpen);
closePopup.addEventListener('click', popupCloseEdit);
closePopupAdd.addEventListener('click', popupCloseAdd);
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);


const cards = document.querySelector('.photo-grid');

function addNewCard(data) {
  const cardElement = document.querySelector('#card-template').content.firstElementChild.cloneNode(true);
  const cardName = cardElement.querySelector('.photo-grid__title');
  const cardImage = cardElement.querySelector('.photo-grid__image');

  const likeButton = cardElement.querySelector('.photo-grid__like');
  const deleteButton = cardElement.querySelector('.photo-grid__delete');
  const showImageButton = cardElement.querySelector('.photo-grid__show-btn');

  const popupShow = document.querySelector('.popup_show');
  const imagePopup = popupShow.querySelector('.popup__image');
  const imageDescription = popupShow.querySelector('.popup__description');

  cardName.textContent = data.name;
  cardImage.src = data.link;

  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('photo-grid__like-active');
  });

  deleteButton.addEventListener('click', function() {
    deleteButton.closest('.photo-grid__item').remove();
  });


  function popupShowOpen() {
    popupShow.classList.add('popup_opened');
    imageDescription.textContent = data.name;
    imagePopup.src = data.link;
  }

  function popupCloseShow() {
    popupShow.classList.remove('popup_opened');
  }

  closePopupShow.addEventListener('click', popupCloseShow);
  showImageButton.addEventListener('click', popupShowOpen);


  return cardElement;
};

function renderCard(data) {
  const cardElement = addNewCard(data);
  cards.prepend(cardElement);
}

initialCards.reverse().forEach((card) => {
  renderCard(card);
});