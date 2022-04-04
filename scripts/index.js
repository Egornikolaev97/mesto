//popups
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupShow = document.querySelector('.popup_show');
const popupAll = document.querySelectorAll('.popup');

const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddCard = document.querySelector('.profile__add-btn');

const cardsContainer = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.photo-grid__item');

//popups close buttons
const buttonCloseEdit = popupEdit.querySelector('.popup__close');
const buttonCloseAdd = popupAdd.querySelector('.popup__close');
const buttonCloseShow = document.querySelector('.popup__close-full');

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
  document.addEventListener('keydown', hadnleEscUp);
}


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

popupAll.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  })
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
  popupErrors = popup.querySelectorAll('.form__input');
  popupErrorsActive = popup.querySelectorAll('.form__error_active');

  popupErrors.forEach((inputElement) => {
    inputElement.classList.remove('form__error');
  });

  popupErrorsActive.forEach((formError) => {
    formError.classList.remove('form__active');
    formError.textContent = '';
  });
}

//listeners
buttonCloseEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

buttonCloseAdd.addEventListener('click', () => {
  closePopup(popupAdd);
});

buttonCloseShow.addEventListener('click', () => {
  closePopup(popupShow);
});

buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  popupOpen(popupEdit);
  deleteErrors(popupEdit);
});

buttonAddCard.addEventListener('click', () => {
  formElementAdd.reset();
  buttonSubmit.setAttribute('disabled', true);
  buttonSubmit.classList.add('form__submit_disabled');
  popupOpen(popupAdd);
  deleteErrors(popupAdd);
});

formElementEdit.addEventListener('submit', handleProfileFormEdit);
formElementAdd.addEventListener('submit', handleProfileFormAdd);


//function for adding new cards
function addNewCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardName = cardElement.querySelector('.photo-grid__title');
  const cardImage = cardElement.querySelector('.photo-grid__image');

//buttons
  const buttonLike = cardElement.querySelector('.photo-grid__like');
  const buttonDelete = cardElement.querySelector('.photo-grid__delete');
  const buttonShowImage = cardElement.querySelector('.photo-grid__show-btn');

  const imagePopup = popupShow.querySelector('.popup__image');
  const imageDescription = popupShow.querySelector('.popup__description');

  cardName.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  buttonLike.addEventListener('click', function() {
    buttonLike.classList.toggle('photo-grid__like-active');
  });

  buttonDelete.addEventListener('click', function() {
    buttonDelete.closest('.photo-grid__item').remove();
  });

  buttonShowImage.addEventListener('click', () => {
    imageDescription.textContent = data.name;
    imagePopup.alt = data.name;
    imagePopup.src = data.link;
    popupOpen(popupShow);
  });

  return cardElement;
};

function renderCard(data) {
  const cardElement = addNewCard(data);
  cardsContainer.prepend(cardElement);
}

initialCards.reverse().forEach((card) => {
  renderCard(card);
});