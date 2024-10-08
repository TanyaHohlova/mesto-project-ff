import {cardTemplate} from './index.js';
import {removeLakesCard, addLakesCard} from './api.js';

const createCard = (obj, likes, owner, cardId, onDeleteCard, found) => {    
    const itemCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    const imgCard = itemCard.querySelector('.card__image');
    const buttonDelete = itemCard.querySelector('.card__delete-button');
    const buttonLikeCard = itemCard.querySelector('.card__like-button');

    //console.log(buttonLikeCard);

    const countLike = itemCard.querySelector('#count')
    countLike.textContent = likes.length

    imgCard.src = obj.cardData.link;
    imgCard.alt = obj.cardData.name;

    if (found) {
      buttonLikeCard.classList.add('card__like-button_is-active');
    } else {
      buttonLikeCard.classList.remove('card__like-button_is-active');
    }

    itemCard.querySelector('.card__title').textContent = obj.cardData.name;
    buttonLikeCard.addEventListener('click', function(evt){
      onLikeCard(evt, cardId, countLike)
    })
    imgCard.addEventListener('click', (evt) => obj.openImagePopup(evt.target.src, evt.target.alt));

    if ( owner === obj.userId) {
      buttonDelete.addEventListener('click', ()=> {
        //console.log(cardId);
        onDeleteCard(cardId, itemCard)
      })
    } else {
      buttonDelete.remove()
     }

    return itemCard;
  };
  
  function onLikeCard(evt, cardId, countLike){
    if ( evt.target.classList.contains('card__like-button_is-active')) {
    removeLakesCard(cardId)
    .then((res)=> {
      countLike.textContent = res.likes.length
      evt.target.classList.remove('card__like-button_is-active');
      //console.log(countLike);
    })
    //.finally(()=> console.log(cardId))
    .catch( err => console.log('Ошибка removeLakes', err))

    } else {
    addLakesCard(cardId)
    .then((res)=> {
      countLike.textContent = res.likes.length
      evt.target.classList.add('card__like-button_is-active');
    })
    //.finally(()=> console.log(cardId))
    .catch( err => console.log('Ошибка addLakes', err))

    }
  };

  export {createCard, onLikeCard};