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

popupBtnOpen.addEventListener("click", () => {
  openPopupProfile()
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
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  console.log(nameInput.value);
  console.log(jobInput.value);
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}

formElement.addEventListener('submit', handleFormSubmit);

popupBtnOpenPlace.addEventListener("click", () => {
  openPopup(popupPlace)
});

popupBtnClosePlace.addEventListener("click", () => {
  closePopup(popupPlace)
});

function createCard(item) {
  const card = template.cloneNode(true);
  card.querySelector(".element__title").textContent = item.name;
  card.querySelector(".element__image").src = item.link;
  card.querySelector(".element__image").alt = item.name;
  card.querySelector(".element__button-like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__button-like_active");
  });
  card.querySelector(".element__button-delete").addEventListener("click", () => {
    card.remove();
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

elements.addEventListener("click", function createPopupImage(evt) {
  if (evt.target.closest(".element__image")) {
    popupImage.src = evt.target.closest(".element__image").src;
    popupImageTitle.alt = evt.target.closest(".element__image").alt;
    popupImageTitle.textContent = evt.target.closest(".element__image").alt;
    openPopup(popupImg);
  }
});

const popupOverlay = document.querySelectorAll(".popup");

popupOverlay.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
    }
  });
});

const closePopupEsc = (evt) => {
  if (evt.code === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  };
};
