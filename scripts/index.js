let editProfile = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');
let sumbit = document.querySelector('form__submit');

editProfile.addEventListener('click', function() {
    popup.classList.add('popup_opened');
});
closePopup.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
});

// Редактирование имени и информации о себе //

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_name');
let aboutInput = formElement.querySelector('.form__input_about');
let submit = formElement.querySelector('.form__submit');


function formSubmitHandler (evt) {
    evt.preventDefault();

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

profileName.textContent = nameInput.value;
profileAbout.textContent = aboutInput.value;
}

submit.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
});


formElement.addEventListener('submit', formSubmitHandler);
