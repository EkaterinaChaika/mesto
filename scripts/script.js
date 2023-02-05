const popupBtnOpen = document.querySelector(".profile-info__button");
const popupContainer = document.querySelector(".popup");
const popupBtnClose = document.querySelector(".button-close");

popupBtnOpen.addEventListener("click", openPopup);
popupBtnClose.addEventListener("click", closePopup);

function openPopup() {
  popupContainer.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function closePopup() {
  popupContainer.classList.remove("popup_opened");
}

let formElement = document.querySelector(".form");
let nameInput = document.querySelector(".form__info_type_name");
let jobInput = document.querySelector(".form__info_type_jobe");

const profileTitle = document.querySelector(".profile-info__title");
const profileSubtitle = document.querySelector(".profile-info__subtitle");

function handleFormSubmit (evt) {
    evt.preventDefault();

    console.log(nameInput.value);
    console.log(jobInput.value);

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
