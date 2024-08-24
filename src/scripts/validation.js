const showInputError = (formElement, inputElement, errorMessage, objValidation) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`)
    // Остальной код такой же
    inputElement.classList.add(objValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(objValidation.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, objValidation) => {
    // Находим элемент ошибки
    //console.log(inputElement)
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    // Остальной код такой же
    //console.log(errorElement)
    inputElement.classList.remove(objValidation.inputErrorClass);
    errorElement.classList.remove(objValidation.errorClass);
    errorElement.textContent = '';
  }; 

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, objValidation) => {
    // встроенный метод setCustomValidity принимает на вход строку
    if (inputElement.validity.patternMismatch) {
        // и заменяет ею стандартное сообщение об ошибке
        inputElement.setCustomValidity("Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы.");
    } else {
        // если передать пустую строку, то будут доступны
        // стандартные браузерные сообщения
        inputElement.setCustomValidity("");
    };
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage, objValidation);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      hideInputError(formElement, inputElement, objValidation);
    }
}; 

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  }; 

const toggleButtonState = (inputList, buttonElement, objValidation) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add(objValidation.inactiveButtonClass);
      //console.log(buttonElement)
    } else {
      // иначе сделай кнопку активной
      buttonElement.disabled = false;
      buttonElement.classList.remove(objValidation.inactiveButtonClass);
    }
  };

const setEventListeners = (formElement, objValidation) => {
    //console.log(objValidation);
    //Найдём все поля формы и сделаем из них массив
    const inputList = Array.from(formElement.querySelectorAll(objValidation.inputSelector));
    //console.log(inputList);
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(objValidation.submitButtonSelector);
    //console.log(buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, objValidation);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonElement, objValidation);
        });
    });
};

const enableValidation = (objValidation) => {
    ///console.log(obj)
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(objValidation.formSelector));
    //console.log(formList)
    // // Переберём полученную коллекцию
    formList.forEach((formElement) => {
    //   // Для каждой формы вызовем функцию setEventListeners,
    //   // передав ей элемент формы
     setEventListeners(formElement, objValidation);
     });
  };

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

function clearValidationErrors(formElement, objValidation) {
  //console.log(objValidation.inputSelector);

    //console.log(formElement.validity)
    const inputList = Array.from(formElement.querySelectorAll(objValidation.inputSelector));

    //console.log(inputList);
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(`${objValidation.submitButtonSelector}`);

    //console.log(inputList);
    //console.log(buttonElement);

    inputList.forEach((inputElement) => {
        //console.log(inputElement.validity);

        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonElement,objValidation );

      // console.log(inputElement)
      // console.log(inputElement.classList.contains('form__input_type_error'))
        if (inputElement.classList.contains(objValidation.inputErrorClass)){
            //console.log('trou');
            hideInputError(formElement, inputElement, objValidation) 
          //console.log(inputElement)
        }  
    });
};

export {enableValidation, clearValidationErrors}


