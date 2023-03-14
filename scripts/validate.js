const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__info',
  submitButtonSelector: '.button-submit',
  inactiveButtonClass: 'button-submit__inactive',
  inputErrorClass: 'form__info_error',
  errorClass: 'form__error_active'
}

function disableSubmit(evt) {
  evt.preventDefault();
}

function enableFormValidation(form, config) {
  form.addEventListener('submit', disableSubmit);

  form.addEventListener('input', () => {
    toggleButton(form, config);
  });
  setEventListeners(form, config);
  toggleButton(form, config);
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    enableFormValidation(form, config);
  });
}

const handleFormInput = (evt, config) => {
  const input = evt.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);   //span элемент c id : "inputID + -errorr"

  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass)
    errorElement.textContent = '';
  } else {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }
}

const enableButton = (config, buttonSubmit) => {
  buttonSubmit.classList.remove(config.inactiveButtonClass);
  buttonSubmit.disabled = false;
}

const disableButton = (config, buttonSubmit) => {
  buttonSubmit.classList.add(config.inactiveButtonClass);
  buttonSubmit.disabled = true;
}

const toggleButton = (form, config) => {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();

  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle('button-submit__inactive', !isFormValid);
}

const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(function (item) {
    item.addEventListener('input', (evt) => {
      handleFormInput(evt, config);
    })
  });
}

enableValidation(validationConfig);

const resetInput = (config) => {
  const inputList = document.querySelectorAll(config.inputSelector);

  inputList.forEach((input) => {
    input.classList.remove(config.inputErrorClass);
    input.nextElementSibling.textContent = '';
  });
}

const resetSubmit = (config) => {
  const buttonSubmit = document.querySelectorAll(config.submitButtonSelector);
  buttonSubmit.forEach((button) => {
    disableButton(config, button);
  });
}
