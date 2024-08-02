import {cardTemplate} from './index.js';
import {openCardElement} from './modal.js';

// @todo: Функция создания карточки
// clickbuttonLikeCard, deleteCard, clickImgCard
const createCard = (cardData, onDeleteCard, onLikeCard, openImagePopup) => {    
    const itemCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    const imgCard = itemCard.querySelector('.card__image');
    const buttonDelete = itemCard.querySelector('.card__delete-button');
    const buttonLikeCard = itemCard.querySelector('.card__like-button');
    imgCard.src = cardData.link;
    imgCard.alt = cardData.name;

    itemCard.querySelector('.card__title').textContent = cardData.name;
  
    buttonDelete.addEventListener('click',onDeleteCard);
    buttonLikeCard.addEventListener('click', onLikeCard);
    imgCard.addEventListener('click', openImagePopup);

    return itemCard;
  }
  
  function onLikeCard(evt){
    evt.target.classList.toggle('card__like-button_is-active')
  }
  
  function onDeleteCard(evt){
    evt.target.closest('.places__item').remove();
  }

  function openImagePopup(evt){
    console.log('create openPopup');
        const element= evt.target;      
        openCardElement(element);
  }

  export {createCard, onDeleteCard, onLikeCard, openImagePopup};