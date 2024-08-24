import '../pages/index.css';
import {getEditProfile, getNewCard, aditEditProfile, aditNewCard, serverDeleteCard, aditAvatarUser} from './api.js';
import {addClassOpenPopup, deleteCloseModalKeyEscepe, closeButtonModal, removeClassOpenPopup} from './modal.js';
import {createCard, onLikeCard} from './card.js';
import {enableValidation, clearValidationErrors} from './validation.js';

const cardTemplate = document.querySelector('#card-template').content;

const cardList = document.querySelector('.places__list');

const objCreateCard = {
    userId:'',
    cardData: '',
    cardId: '', 
    onLikeCard, 
    openImagePopup,
};

const buttomEdit =  document.querySelector('.profile__edit-button');
const buttomAddCard =  document.querySelector('.profile__add-button');
const buttonCloseModalList = document.querySelectorAll('.popup__close');
const buttonEditImgAvatar = document.querySelector('.profile__image-buttom');



const popupsList = document.querySelectorAll('.popup');

const popupEditProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImgAvatar = document.querySelector('.profile__image')

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImge = document.querySelector('.popup_type_image');

const popupDeleteCard = document.querySelector('.popup__delete-card')

const popupEgitImgAvatar = document.querySelector('.popup__new-image-avatar')
//console.log(popupEgitImgAvatar);

const formEditProfile = document.forms['edit-profile'];
const formInputProfileName = document.querySelector('.popup__input_type_name');
const formInputProfileJob = document.querySelector('.popup__input_type_description');

const formNewPlace = document.forms['new-place'];
const formInputCardName = formNewPlace.querySelector('.popup__input_type_card-name');
const formInputCardLink = formNewPlace.querySelector('.popup__input_type_url');

const foremDeleteCard = document.forms['delete-card']

const formEfitImgAvatar = document.forms['edit-image-avatar']
const formInpuImgAvatarLink = formEfitImgAvatar.querySelector('.popup__input_type_url');

//console.log(formEfitImgAvatar);
//console.log(formInpuImgAvatarLink);

/*-----------open------------------*/
buttomEdit.addEventListener('click', handlOpenPopupEditProfile);
buttomAddCard.addEventListener('click', handlopenPopupNewCard);
buttonEditImgAvatar.addEventListener('click', handlopenPopupNewImgAvata)

function handlOpenPopupEditProfile(){
    const buttom = formEditProfile.querySelector('.popup__button');
    buttom.textContent = 'Сохранить'

    console.log(buttom);

    const InputTextName = document.querySelector('.profile__title').textContent;
    const InputTextJob = document.querySelector('.profile__description').textContent;

    formInputProfileName.value = InputTextName;
    formInputProfileJob.value = InputTextJob;

    clearValidationErrors(formEditProfile, objValidation);
    addClassOpenPopup(popupEditProfile);
};

function handlopenPopupNewCard(){
    const buttom = formNewPlace.querySelector('.popup__button');
    buttom.textContent = 'Сохранить'

    clearValidationErrors(formNewPlace, objValidation);
    addClassOpenPopup(popupNewCard);
};

function handlopenPopupNewImgAvata(){
    const buttom = formEfitImgAvatar.querySelector('.popup__button');
    buttom.textContent = 'Сохранить'

    clearValidationErrors(formEfitImgAvatar, objValidation);
    addClassOpenPopup(popupEgitImgAvatar);
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
        const element= evt.target;      
        openCardElement(element);
};

/*-------------close-button--------------*/
closeButtonModal(buttonCloseModalList);

/*------------form-editing-profile---------------*/
function handleFormProfile(evt) {
    evt.preventDefault(); 
    const buttom = formEditProfile.querySelector('.popup__button');
    buttom.textContent = 'Сохранить'

    aditEditProfile(formInputProfileName.value, formInputProfileJob.value)
    .then(() =>{
        addInputInProfile(formInputProfileName.value, formInputProfileJob.value)
        removeClassOpenPopup(popupEditProfile);
        deleteCloseModalKeyEscepe();
    })
    .finally(() => {
        buttom.textContent = 'Сохранение...'
    })
};

function addInputInProfile (valueName, valueJob) {
    profileTitle.textContent = valueName;
    profileDescription.textContent = valueJob;

}

formEditProfile.addEventListener('submit', handleFormProfile);

/*--------------form-editing-card----------------------*/
function handleFormCard(evt) {
    evt.preventDefault(); 

    const buttom = formNewPlace.querySelector('.popup__button');
    buttom.textContent = 'Сохранить'

    const titleValue = formInputCardName.value;
    const LinkValue = formInputCardLink.value;

    objCreateCard.cardData = {
        name: titleValue, 
        link: LinkValue,
    };

    aditNewCard(objCreateCard.cardData)
    .then((data) =>{
        //console.log(data)
        const foundUserLike = false;  
        const element = createCard(objCreateCard, data.likes, data.owner._id, objCreateCard.userId, handleDeleteCard, foundUserLike);
        removeClassOpenPopup(popupNewCard);
        deleteCloseModalKeyEscepe();
        cardList.prepend(element);
    })
    .finally(() => {
        buttom.textContent = 'Сохранение...'
    })
    
    formNewPlace.reset();
};

formNewPlace.addEventListener('submit', handleFormCard);

/*--------------form-delete-card----------------------*/
let cardForDelete = {}
const handleDeleteCard = (cardId, cardElement) => {
    cardForDelete = {
        id: cardId,
        cardElement 
    }
    addClassOpenPopup(popupDeleteCard)
    //openModal(cardDeleteModalWindow); // открытие попапа подтверждения удаления
};

const handleDeleteCardSubmit = (evt) => {
    evt.preventDefault();
    
    serverDeleteCard(cardForDelete.id) // вызываем функцию удаления из api
    .then(() => {
        cardForDelete.cardElement.remove();
        removeClassOpenPopup(popupDeleteCard);
        cardForDelete = {};
      })
    .catch((err) => {})

  };

foremDeleteCard.addEventListener('submit', handleDeleteCardSubmit);

/*------------form-editing-Image-Avatar--------------*/
function handleFormNewImgAvata(evt) {
    evt.preventDefault(); 

    const buttom = formEfitImgAvatar.querySelector('.popup__button');

    const image = formInpuImgAvatarLink.value

    aditAvatarUser(image)
    .then(() => {
       profileImgAvatar.style.cssText = `background-image: url('${image}');`;
       removeClassOpenPopup(popupEgitImgAvatar);
        deleteCloseModalKeyEscepe();
    })
    .finally(() => {
        buttom.textContent = 'Сохранение...'

    })

};

formEfitImgAvatar.addEventListener('submit', handleFormNewImgAvata);

/*----------slowly-open-------------------*/
popupsList.forEach(popup => {
    popup.classList.add('popup_is-animated');
    popup.style.visibility = 'visible';
});

/*----------Валидация форм-------------------*/
const objValidation = {
    formSelector: '.popup__form', 
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive', 
    inputErrorClass: 'popup__input_type_error', 
    errorClass: 'popup__error_visible' 
}

enableValidation (objValidation);

/*---------------API------------------*/
Promise.all ([getEditProfile(), getNewCard()])
.then (([avatarProfile, newCards]) => {
    profileTitle.textContent = avatarProfile.name;
    profileDescription.textContent = avatarProfile.about;
    profileImgAvatar.style.cssText = `background-image: url(${avatarProfile.avatar});`;
    objCreateCard.userId = avatarProfile._id

    newCards.forEach(function(data){
        //console.log(data.likes);
        objCreateCard.cardData = {
            name: data.name, 
            link: data.link,
        };
           
        const foundUserLike = data.likes.find(obj => obj._id === objCreateCard.userId);  
        //    if (found) {
        //     console.log(found); 
        //    } else {
        //     console.log('Объект не найден');
        //    }

        objCreateCard.openImagePopup = openImagePopup;
        const addTemplate = createCard(objCreateCard, data.likes, data.owner._id, data._id, handleDeleteCard, foundUserLike);
        cardList.append(addTemplate);
    });

})
.catch( err => console.log('Ошибка', err));

export {cardTemplate}
