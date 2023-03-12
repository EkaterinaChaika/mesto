const showError = (errorElement, message, errorClass) => {
  errorElement.innerText = message;
  errorElement.classList.add(errorClass);
};

const hiddenError = (errorElement, errorClass) => {
  errorElement.innerText = "";
  errorElement.classList.remove(errorClass);
};

const isValid = (inputSelector, formSelector, options) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  if (inputSelector.validity.valid) {
    hiddenError(inputSelector, errorElement, options);
  } else {
    showError(inputSelector, errorElement, inputSelector.validationMessage, options);
  }
};

const enableSubmitButton = (buttonElement, options) => {
  buttonElement.removeAttribute("disabled");
  buttonElement.classList.remove(options.inactiveButtonClass);
};

const disableSubmitButton = (buttonElement, options) => {
  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add(options.inactiveButtonClass);
};

const toggleSubmitButton = (inputs, buttonButton, options) => {
  const formIsValid = inputs.every(inputSelector => inputSelector.validity.valid);
  if (formIsValid) {
    enableSubmitButton(buttonButton, options);
  } else {
    disableSubmitButton(buttonButton, options);
  }
};

const setEventListeners = (formSelector, options) => {
  const inputs = Array.from(formSelector.querySelectorAll(options.inputSelector));
  const submitButton = formSelector.querySelector(options.submitButtonSelector);
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      isValid(input, formSelector, options);
      toggleSubmitButton(inputs, submitButton, options);
    });
    toggleSubmitButton(inputs, submitButton, options);
  });
};

const enableValidation = (options) => {
  const forms = Array.from(document.querySelectorAll(options.formSelector));
  forms.forEach(form => {
    setEventListeners(form, options);
  });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__info',
  submitButtonSelector: '.button-submit',
  inactiveButtonClass: 'button-submit_disabled',
  inputErrorClass: '.form__input-error',
  errorClass: 'form__input-error_visible'
});
