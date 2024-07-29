import {cardTemplate, popupImge, popups} from './index.js';

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Функция создания карточки
function createCard(item) {
  const itemCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  const imgCard = itemCard.querySelector('.card__image');
  const deleteButton = itemCard.querySelector('.card__delete-button');
  imgCard.src = item.link;
  imgCard.alt = item.name;
  itemCard.querySelector('.card__title').textContent = item.name;
  deleteButton.addEventListener('click',deleteCard);
  return itemCard;
}

// @todo: Функция удаления карточки 
function deleteCard(evt){
  evt.target.closest('.places__item').remove();
}

export {initialCards, createCard, deleteCard};