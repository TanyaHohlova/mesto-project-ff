import '../pages/index.css';
import {initialCards} from './cards.js';
import {deleteCloseModalKeyEscepe,deleteHandlclickOnOverlay, closeButtonModal, openPopupEditProfile, openPopupNewCard, removeClassOpenPopup} from './modal.js';
import {createCard, onDeleteCard, onLikeCard, openImagePopup} from './card.js'
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу

initialCards.forEach(function(cardData){
    const addTemplate = createCard(cardData, onDeleteCard, onLikeCard, openImagePopup);
    cardList.append(addTemplate);
});

const buttomEdit =  document.querySelector('.profile__edit-button');
const buttomAddCard =  document.querySelector('.profile__add-button');
const buttomImge = document.querySelectorAll('.card__image');
const buttonCloseModal = document.querySelectorAll('.popup__close');

const buttonLikePopupCards = document.querySelectorAll('.card__like-button');

const popups = document.querySelectorAll('.popup');

const popupEditProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImge = document.querySelector('.popup_type_image');

const formEditProfile = document.forms['edit-profile'];
const formInputProfileName = document.querySelector('.popup__input_type_name');
const formInputProfileJob = document.querySelector('.popup__input_type_description');

const formNewPlace = document.forms['new-place'];
const formInputCardName = document.querySelector('.popup__input_type_card-name');
const formInputCardLink = document.querySelector('.popup__input_type_url');


/*-----------open------------------*/
openPopupEditProfile(popupEditProfile);
openPopupNewCard(popupNewCard);

/*-------------close-button--------------*/
closeButtonModal(buttonCloseModal);

/*-------------editing-profile---------------*/
function handleFormProfile(evt) {
    evt.preventDefault(); 

    const titleValue = formInputProfileName.value;
    const jobValue = formInputProfileJob.value;

    profileTitle.textContent = titleValue ;
    profileDescription.textContent = jobValue;

    removeClassOpenPopup(popupEditProfile)
    deleteCloseModalKeyEscepe()
    deleteHandlclickOnOverlay(popupEditProfile)
};

formEditProfile.addEventListener('submit', handleFormProfile);

/*---------------editing-card----------------------*/
function handleFormCard(evt) {
    evt.preventDefault(); 

    const titleValue = formInputCardName.value;
    const LinkValue = formInputCardLink.value;

    const initialCard = {name:titleValue, link:LinkValue};
    const element = createCard(initialCard, onDeleteCard, onLikeCard, openImagePopup )

    console.log(element)
    cardList.prepend(element);
//  https://porodysobak.ru/wp-content/uploads/2023/02/kanarskij-dog-3.jpeg

    removeClassOpenPopup(popupNewCard)
    deleteCloseModalKeyEscepe()
    deleteHandlclickOnOverlay(popupNewCard)

    formNewPlace.reset()

};

formNewPlace.addEventListener('submit', handleFormCard);

/*----------slowly-open-------------------*/
popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
    popup.style.visibility = 'visible'
});

export {cardTemplate, popupImge, popups, buttonCloseModal, buttonLikePopupCards, formInputProfileName, formInputProfileJob, popupEditProfile, popupNewCard, buttomAddCard, buttomEdit, }