/*-----------open------------------*/
function addClassOpenPopup(element){
    element.classList.add('popup_is-opened');
    listeneEscepe();
    clickOnOverlay(element);

};

// /*-------------close---------------*/
function removeClassOpenPopup(element){
    //console.log('f removeClassOpenPopup');
    element.classList.remove('popup_is-opened');
    deleteCloseModalKeyEscepe();

};

function closeButtonModal(buttonCloseModal){
    buttonCloseModal.forEach(button => {
        button.addEventListener('click', (evt) => {
            //console.log('buttonCloseModal');
            removeClassOpenPopup(evt.target.closest('.popup_is-opened'));
            })
    })
};


/*-------------close-click-overlay-------------*/
function clickOnOverlay(element){
    //console.log('create clickOnOverlay'); 
    element.addEventListener( 'click', handlclickOnOverlay);
};
        
function  handlclickOnOverlay(evt){
    //console.log('click');
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        removeClassOpenPopup(evt.target);
     }
};


/*-------------close-Escepe---------------*/
function listeneEscepe(){
    //console.log('create listener Escepe');
    document.addEventListener('keyup', handlcloseModalEscepe);
};

function handlcloseModalEscepe(evt) {
    const content = evt.target;
    if (evt.code === 'Escape') {
        const element = content.querySelector('.popup_is-opened');
        removeClassOpenPopup(element);
    }
};

function deleteCloseModalKeyEscepe(){
    //console.log('delete listener Escepe');
    document.removeEventListener('keyup', handlcloseModalEscepe);
};

export {addClassOpenPopup, deleteCloseModalKeyEscepe, closeButtonModal, removeClassOpenPopup};