import {cardTemplate} from './index.js';
// @todo: Функция создания карточки

const createCard = (obj) => {    
    const itemCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    const imgCard = itemCard.querySelector('.card__image');
    const buttonDelete = itemCard.querySelector('.card__delete-button');
    const buttonLikeCard = itemCard.querySelector('.card__like-button');
    imgCard.src = obj.cardData.link;
    imgCard.alt = obj.cardData.name;

    itemCard.querySelector('.card__title').textContent = obj.cardData.name;
  
    buttonDelete.addEventListener('click', obj.onDeleteCard);
    buttonLikeCard.addEventListener('click', obj.onLikeCard);
    imgCard.addEventListener('click', obj.openImagePopup);

    return itemCard;
  };
  
  function onLikeCard(evt){
    evt.target.classList.toggle('card__like-button_is-active');
  };
  
  function onDeleteCard(evt){
    evt.target.closest('.places__item').remove();
  };

  export {createCard, onDeleteCard, onLikeCard};