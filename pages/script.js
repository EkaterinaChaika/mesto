const popupBtnOpen = document.querySelector(".profile-info__button");
const popupContainer = document.querySelector(".popup");
const popupBtnClose = document.querySelector(".button-close");

popupBtnOpen.addEventListener("click", OpenPopup);
popupBtnClose.addEventListener("click", ClosePopup);

function OpenPopup() {
  popupContainer.classList.add("popup_opened");
}

function ClosePopup() {
  popupContainer.classList.remove("popup_opened");
}

let formElement = document.querySelector(".form");
let nameInput = document.querySelector(".form-name");
let jobInput = document.querySelector(".form-job");


function handleFormSubmit (evt) {
    evt.preventDefault();

    console.log(nameInput.value);
    console.log(jobInput.value);

    const profileTitle = document.querySelector(".profile-info__title");
    const profileSubtitle = document.querySelector(".profile-info__subtitle");

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);
