//function for opening popups
// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', hadnleEscUp);
// }

//function for closing popups
// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', hadnleEscUp);
//   }

//function for closing popup by ESC
// function hadnleEscUp(evt) {
//     if (evt.key === 'Escape') {
//       const popupActive = document.querySelector('.popup_opened');
//       closePopup(popupActive);
//     }
//   }

const popupShow = document.querySelector('.popup_show');
const imagePopup = popupShow.querySelector('.popup__image');
const imageDescription = popupShow.querySelector('.popup__description');

export { closePopup, popupShow, imagePopup, imageDescription };