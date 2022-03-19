//popups
const editProfile = document.querySelector('.profile__edit-btn');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupShow = document.querySelector('.popup_show');
const addCards = document.querySelector('.profile__add-btn');

const cards = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.photo-grid__item');

//popups close buttons
const closePopupEdit = popupEdit.querySelector('.popup__close');
const closePopupAdd = popupAdd.querySelector('.popup__close');
const closePopupShow = document.querySelector('.popup__close-full');

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

//open and close popups
function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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

//listeners
closePopupEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

closePopupAdd.addEventListener('click', () => {
  closePopup(popupAdd);
});

closePopupShow.addEventListener('click', () => {
  closePopup(popupShow);
});

editProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  popupOpen(popupEdit);
});

addCards.addEventListener('click', () => {
  formElementAdd.reset();
  popupOpen(popupAdd);
});

formElementEdit.addEventListener('submit', handleProfileFormEdit);
formElementAdd.addEventListener('submit', handleProfileFormAdd);

function addNewCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardName = cardElement.querySelector('.photo-grid__title');
  const cardImage = cardElement.querySelector('.photo-grid__image');

//buttons
  const likeButton = cardElement.querySelector('.photo-grid__like');
  const deleteButton = cardElement.querySelector('.photo-grid__delete');
  const showImageButton = cardElement.querySelector('.photo-grid__show-btn');

  const imagePopup = popupShow.querySelector('.popup__image');
  const imageDescription = popupShow.querySelector('.popup__description');

  cardName.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('photo-grid__like-active');
  });

  deleteButton.addEventListener('click', function() {
    deleteButton.closest('.photo-grid__item').remove();
  });

  showImageButton.addEventListener('click', () => {
    imageDescription.textContent = data.name;
    imagePopup.alt = data.name;
    imagePopup.src = data.link;
    popupOpen(popupShow);
  });

  return cardElement;
};

function renderCard(data) {
  const cardElement = addNewCard(data);
  cards.prepend(cardElement);
}

initialCards.reverse().forEach((card) => {
  renderCard(card);
});