const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupBtnOpen = document.querySelector(".profile-info__button");
const popupContainer = document.querySelector(".popup");
const popupBtnClose = document.querySelector(".button-close");
const popupProfile = document.querySelector(".popup_type_profile");
const popupPlace = document.querySelector(".popup_type_place");
const popupImg = document.querySelector(".popup_type_img");
const popupBtnOpenPlace = document.querySelector(".add-button");
const popupBtnClosePlace = document.querySelector(".button-close_type_place");
const formElement = document.querySelector(".form-profile");
const nameInput = document.querySelector(".form__info_type_name");
const jobInput = document.querySelector(".form__info_type_jobe");
const profileTitle = document.querySelector(".profile-info__title");
const profileSubtitle = document.querySelector(".profile-info__subtitle");
const template = document.querySelector(".element-template").content.querySelector(".element");
const elements = document.querySelector(".elements");
const submitBtnPlace = document.querySelector(".button-submit_type_place");
const namePlace = document.querySelector(".form__info_place_name");
const linkPlace = document.querySelector(".form__info_img_link");
const formPlace = document.querySelector(".form-place");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__image-title");
const popupBtnCloseImage = document.querySelector(".button-close_type_img");
const inputForm = document.querySelector(".form__info");

popupBtnOpen.addEventListener("click", () => {
  openPopupProfile();
  resetInput(formElement);
});

popupBtnClose.addEventListener("click", () => {
  closePopup(popupProfile)
});

function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  };
};

function submitEditProfileForm(evt) {
  evt.preventDefault();
  console.log(nameInput.value);
  console.log(jobInput.value);
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}

formElement.addEventListener('submit', submitEditProfileForm);

popupBtnOpenPlace.addEventListener("click", () => {
  openPopup(popupPlace);
  namePlace.value = "";
  linkPlace.value = "";
  resetInput(formPlace);
  const config = { inactiveButtonClass: 'button-submit__inactive' };
  disableButton(config, submitBtnPlace);
});

const resetInput = (form) => {
  const inputList = form.querySelectorAll('.form__info');
  inputList.forEach((input) => {
    input.classList.remove('form__info_error');
    input.nextElementSibling.textContent = '';
  });
}

popupBtnClosePlace.addEventListener("click", () => {
  closePopup(popupPlace)
});

function createCard(item) {
  const card = template.cloneNode(true);
  const elementImage = card.querySelector(".element__image");
  card.querySelector(".element__title").textContent = item.name;
  elementImage.src = item.link;
  elementImage.alt = item.name;
  card.querySelector(".element__button-like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__button-like_active");
  });
  card.querySelector(".element__button-delete").addEventListener("click", () => {
    card.remove();
  });
  elementImage.addEventListener("click", () => {
    popupImage.src = item.link;
    popupImageTitle.alt = item.name;
    popupImageTitle.textContent = item.name;
    openPopup(popupImg);
  });

  return card
}

function renderCards(initialCards) {
  const cards = initialCards.map((item) => {
    return createCard(item);
  });
  elements.append(...cards);
}

renderCards(initialCards);

formPlace.addEventListener("submit", (e) => {
  e.preventDefault();
  const card = createCard({ name: namePlace.value, link: linkPlace.value });
  elements.prepend(card);
  closePopup(popupPlace);
  e.target.reset();
});

popupBtnCloseImage.addEventListener("click", () => {
  closePopup(popupImg);
});

const popupOverlay = document.querySelectorAll(".popup");

popupOverlay.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
    }
  });
});
