import '../pages/index.css';
import {initialCards, createCard, deleteCard} from './cards.js';
import {addCardForm, clickOnOverlay} from './modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

const editButtom =  document.querySelector('.profile__edit-button');
const addButtom =  document.querySelector('.profile__add-button');
const imgeButton = document.querySelectorAll('.card__image');
const closePopupButton = document.querySelectorAll('.popup__close');

const lickButton  = document.querySelectorAll('.card__like-button');

let popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNew_card = document.querySelector('.popup_type_new-card');
let popupImge = document.querySelector('.popup_type_image');

const formElement = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const formCardElement = document.forms['new-place'];
let cardNameameInput = document.querySelector('.popup__input_type_card-name');
let cardLinkInput = document.querySelector('.popup__input_type_url');

let addTemplate;

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item){
    addTemplate = createCard(item);
    cardList.append(addTemplate);
});
/*-----------open------------------*/
 
editButtom.addEventListener('click', (evt)=> {
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    popupEdit.classList.add('popup_is-opened');
    clickOnOverlay()
});

addButtom.addEventListener('click', ()=> {
    popupNew_card.classList.add('popup_is-opened');
    clickOnOverlay() 
});

imgeButton.forEach(img => {
    img.addEventListener('click', addCardForm);
    clickOnOverlay()
});

/*-------------close---------------*/
closePopupButton.forEach(button => {
    button.addEventListener('click', () => {
        for (let i = 0; i < popups.length; i++) {
            popups[i].classList.remove('popup_is-opened');
        }
    })
});

/*-------------close-Escepe---------------*/
document.addEventListener('keyup', function(evt) {
    if (evt.code === 'Escape') {
        for (let i = 0; i < popups.length; i++){
            popups[i].classList.remove('popup_is-opened')
        }
    }
});

/*-------------editing-profile---------------*/
// Находим форму в DOM

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    // Получите значение полей jobInput и nameInput из свойства value
    const titleValue = nameInput.value;
    const jobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = titleValue ;
    profileDescription.textContent = jobValue;

    for (let i = 0; i < popups.length; i++){
        popups[i].classList.remove('popup_is-opened')
    }
};
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

/*---------------editing-card----------------------*/

// Находим форму в DOM

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormCard(evt) {
    evt.preventDefault(); 
    // Получите значение полей jobInput и nameInput из свойства value
    const titleValue = cardNameameInput.value;
    const LinkValue = cardLinkInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const itemCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    const imgCard = itemCard.querySelector('.card__image');
    // Вставьте новые значения с помощью textContent
  
    imgCard.src = LinkValue;
    imgCard.alt = titleValue;
    itemCard.querySelector('.card__title').textContent = titleValue;

    cardList.prepend(itemCard);
//  https://porodysobak.ru/wp-content/uploads/2023/02/kanarskij-dog-3.jpeg
    cardNameameInput.value = '';
    cardLinkInput.value = '';

    for (let i = 0; i < popups.length; i++){
        popups[i].classList.remove('popup_is-opened')
    }
};
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formCardElement.addEventListener('submit', handleFormCard);

/*----------button-lick--------------*/
lickButton.forEach( button => {
    button.addEventListener('click', function(evt){
        evt.target.classList.toggle('card__like-button_is-active')
    })
});

/*----------slowly-open-------------------*/
for (let i = 0; i < popups.length; i++) {
    popups[i].classList.add('popup_is-animated');
    console.log(popups[i]);
    popups[i].style.visibility = 'visible'
}

export {cardTemplate, popupImge, popups};