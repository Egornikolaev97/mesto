let editProfile = document.querySelector('.profile__edit-btn');
let closePopup = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');

editProfile.addEventListener('click', function() {
    popup.classList.add('popup_opened');
});
closePopup.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
});