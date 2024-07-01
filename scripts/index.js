// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function creatCard(item) {
    const itemCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    const imgCard = itemCard.querySelector('.card__image');
    const deleteButton = itemCard.querySelector('.card__delete-button');
    imgCard.src = item.link;
    imgCard.alt = item.name;
    itemCard.querySelector('.card__title').textContent = item.name;

// @todo: Функция удаления карточки 
    deleteButton.addEventListener('click',function (){
        const deleteCard = deleteButton.closest('.places__item');
        deleteCard.remove();
    });

    return itemCard;
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item){
    addTemplate = creatCard(item);
    cardList.append(addTemplate);
});