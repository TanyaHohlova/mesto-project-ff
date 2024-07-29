import {cardTemplate, popupImge, popups} from './index.js';

function addCardForm(element) {
    const popupElement = popupImge.querySelector('.popup__image');
    popupElement.src = element.target.src;
    popupElement.alt = element.target.alt;

    const popupItem = popupImge.querySelector('.popup__caption');
    popupItem.textContent = element.target.alt;
    popupImge.classList.add('popup_is-opened'); 
} 

function clickOnOverlay(){
    for (let i = 0; i < popups.length; i++) {
        popups[i].addEventListener( 'click', (e) => {
            const contentPopup = popups[i].querySelector('.popup__content');
            const withinBoundaries = e.composedPath().includes(contentPopup)
            if ( ! withinBoundaries ) {
                popups[i].classList.remove('popup_is-opened')
            } 
        })
    }
};

export {addCardForm, clickOnOverlay};