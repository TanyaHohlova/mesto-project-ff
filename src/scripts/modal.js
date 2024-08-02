import {popups, popupImge, buttomAddCard, buttomEdit, formInputProfileName,formInputProfileJob} from './index.js';

/*-----------open------------------*/
function openPopupEditProfile(popupEditProfile){
    buttomEdit.addEventListener('click', (evt)=> {
        const InputTextName = document.querySelector('.profile__title').textContent;
        const InputTextJob = document.querySelector('.profile__description').textContent;

        formInputProfileName.value = InputTextName;
        formInputProfileJob.value = InputTextJob;

        addClassOpenPopup(popupEditProfile);

        closeModalKeyEscepe(); 
        clickOnOverlay(popupEditProfile);
        
    });
};

function openPopupNewCard(popupNewCard){
    buttomAddCard.addEventListener('click', (evt)=> {
        addClassOpenPopup(popupNewCard);
        closeModalKeyEscepe();
        clickOnOverlay(popupNewCard);
    });
};

function openCardElement(element) {
    const popupElement = popupImge.querySelector('.popup__image');
    popupElement.src = element.src;
    popupElement.alt = element.alt;

    const popupItem = popupImge.querySelector('.popup__caption');
    popupItem.textContent = element.alt;
    popupImge.classList.add('popup_is-opened');

    //console.log('openCardElement');
    clickOnOverlay(popupImge)
    closeModalKeyEscepe()
} 

function addClassOpenPopup(element){
    element.classList.add('popup_is-opened');
};

// /*-------------close---------------*/
function removeClassOpenPopup(element){
    //console.log('f removeClassOpenPopup');
    element.classList.remove('popup_is-opened');
}

function closeButtonModal(buttonCloseModal){
    buttonCloseModal.forEach(button => {
        button.addEventListener('click', (evt) => {
            //console.log('buttonCloseModal')
            popups.forEach(popup => {
                if (popup.classList.contains('popup_is-opened')){
                    deleteCloseModalKeyEscepe()
                    deleteHandlclickOnOverlay(popup)
                    removeClassOpenPopup(popup)
                }
            });
        })
    });
};

/*-------------close-click-overlay-------------*/
function clickOnOverlay(element){
    //console.log('create clickOnOverlay'); 
    element.addEventListener( 'click', handlclickOnOverlay)
} 
        
function  handlclickOnOverlay(e){
    //console.log('click');
    //console.log(e.target)
    const modal = document.querySelector('.popup_is-opened');
    if (modal){
        //console.log('model true');
        const element = e.target
        const contentPopup = modal.querySelector('.popup__content');
        const withinBoundaries = e.composedPath().includes(contentPopup)
        if ( !withinBoundaries ) {
            //console.log('!withinBoundaries');
            deleteHandlclickOnOverlay(element);
            deleteCloseModalKeyEscepe(); 
            removeClassOpenPopup(element);
        }
    }
}

function deleteHandlclickOnOverlay(element){
    //console.log('delet clickOnOverlay');
    element.removeEventListener( 'click', handlclickOnOverlay);  
};

/*-------------close-Escepe---------------*/

function closeModalKeyEscepe(){
    //console.log('create listener Escepe')
    document.addEventListener('keyup', handlcloseModalEscepe);
}

function handlcloseModalEscepe(evt) {
    const content = evt.target;
    const element = content.querySelector('.popup_is-opened');
    if (evt.code === 'Escape') {
        //console.log('listener Escepe');
        removeClassOpenPopup(element);
        deleteCloseModalKeyEscepe()
        deleteHandlclickOnOverlay(element)
        
    }
}

function deleteCloseModalKeyEscepe(){
    //console.log('delete listener Escepe')
    document.removeEventListener('keyup', handlcloseModalEscepe);
}

export {deleteCloseModalKeyEscepe, deleteHandlclickOnOverlay, closeButtonModal, closeModalKeyEscepe, openPopupEditProfile, openPopupNewCard, removeClassOpenPopup, openCardElement};