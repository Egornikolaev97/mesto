let editProfile = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');
let sumbit = document.querySelector('form__submit');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_type_name');
let aboutInput = formElement.querySelector('.form__input_type_about');
let submit = formElement.querySelector('.form__submit');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

function popupOpened() {
    popup.classList.add('popup_opened');
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

// Редактирование имени и информации о себе //
function formSubmitHandler(evt) {
    evt.preventDefault();

    popupOpened();
    popup.classList.remove('popup_opened');
}


editProfile.addEventListener('click', popupOpened);
closePopup.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);