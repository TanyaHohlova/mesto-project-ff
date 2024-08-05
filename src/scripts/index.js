import '../pages/index.css';
import {initialCards} from './cards.js';
import {addClassOpenPopup, deleteCloseModalKeyEscepe, closeButtonModal, removeClassOpenPopup} from './modal.js';
import {createCard, onDeleteCard, onLikeCard} from './card.js';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
const objCreateCard = {
    cardData: '', 
    onDeleteCard, 
    onLikeCard, 
    openImagePopup
};

initialCards.forEach(function(cardData){
    objCreateCard.cardData = cardData;
    objCreateCard.openImagePopup = openImagePopup;

    const addTemplate = createCard(objCreateCard);
    cardList.append(addTemplate);
});

const buttomEdit =  document.querySelector('.profile__edit-button');
const buttomAddCard =  document.querySelector('.profile__add-button');
const buttonCloseModalList = document.querySelectorAll('.popup__close');

const popupsList = document.querySelectorAll('.popup');

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
buttomEdit.addEventListener('click', handlOpenPopupEditProfile);
buttomAddCard.addEventListener('click', handlopenPopupNewCard);


function handlOpenPopupEditProfile(){
    const InputTextName = document.querySelector('.profile__title').textContent;
    const InputTextJob = document.querySelector('.profile__description').textContent;

    formInputProfileName.value = InputTextName;
    formInputProfileJob.value = InputTextJob;

    addClassOpenPopup(popupEditProfile);
};

function handlopenPopupNewCard(){
    addClassOpenPopup(popupNewCard);
};

function openCardElement(element) {
    const popupElement = popupImge.querySelector('.popup__image');
    popupElement.src = element.src;
    popupElement.alt = element.alt;

    const popupItem = popupImge.querySelector('.popup__caption');
    popupItem.textContent = element.alt;
    addClassOpenPopup(popupImge);
};

function openImagePopup(evt){
    //console.log('create openPopup');
        const element= evt.target;      
        openCardElement(element);
};
/*-------------close-button--------------*/
closeButtonModal(buttonCloseModalList);

/*-------------editing-profile---------------*/
function handleFormProfile(evt) {
    evt.preventDefault(); 

    const titleValue = formInputProfileName.value;
    const jobValue = formInputProfileJob.value;

    profileTitle.textContent = titleValue ;
    profileDescription.textContent = jobValue;

    removeClassOpenPopup(popupEditProfile);
    deleteCloseModalKeyEscepe();
};

formEditProfile.addEventListener('submit', handleFormProfile);

/*---------------editing-card----------------------*/
function handleFormCard(evt) {
    evt.preventDefault(); 
    const titleValue = formInputCardName.value;
    const LinkValue = formInputCardLink.value;

    const initialCard = {name:titleValue, link:LinkValue};
    objCreateCard.cardData = initialCard;
    const element = createCard(objCreateCard);

    cardList.prepend(element);
//  https://porodysobak.ru/wp-content/uploads/2023/02/kanarskij-dog-3.jpeg

    removeClassOpenPopup(popupNewCard);
    deleteCloseModalKeyEscepe();
    formNewPlace.reset();

};

formNewPlace.addEventListener('submit', handleFormCard);

/*----------slowly-open-------------------*/
popupsList.forEach(popup => {
    popup.classList.add('popup_is-animated');
    popup.style.visibility = 'visible';
});

export {cardTemplate}
