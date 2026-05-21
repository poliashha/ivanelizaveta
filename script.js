const scriptURL =
  "https://script.google.com/macros/s/AKfycbw6VZvPu5WZj6qUDtOiHS2toyQ4Fh7oGD4Id1ZUFqU4_Z_zPBVbqEu_pFDdScy4ADOE/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formSendResult = document.querySelector(".form-send");
  formSendResult.textContent = "";
 const drinks = formData.getAll("drinks");
  const submitButton = document.querySelector(".button");
  submitButton.textContent = "Отправка...";

  // Преобразуем массив в строку с разделителем (например, запятая)

  // Создаем новый FormData и добавляем все поля
  const newFormData = new FormData();
  newFormData.append("name", formData.get("name"));
  newFormData.append("music", formData.get("music") || '-');
  newFormData.append("presence", formData.get("presence"));
 
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: newFormData,
    });
    formSendResult.textContent = "Спасибо! Анкета отправлена.";
    form.reset(); // Очищаем форму
  } catch (error) {
    formSendResult.textContent = "Повторите попытку позже.";
    console.error(error);
  } finally {
    // Возвращаем кнопку в исходное состояние
    submitButton.textContent = "Отправить";
  }
});

const nameInput = document.getElementById("name");
const errorElement = document.getElementById("error-text");

nameInput.addEventListener("invalid", function (event) {
  event.preventDefault();
  if (this.validity.valueMissing) {
    errorElement.classList.add("show");
  }
});

nameInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    errorElement.classList.remove("show");
  }
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("invalid", function (e) {
    e.preventDefault();
    document.getElementById("presenceError").classList.add("show");
    return false;
  });
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.getElementById("presenceError").classList.remove("show");
  });
});

const button = document.querySelector(".button");
const mapbutton = document.querySelector(".map-button");
button.addEventListener("touchstart", function (e) {
  this.classList.add("touch-pressed");
});

button.addEventListener("touchend", function (e) {
  this.classList.remove("touch-pressed");
});
mapbutton.addEventListener("touchstart", function (e) {
  this.classList.add("touch-pressed");
});

mapbutton.addEventListener("touchend", function (e) {
  this.classList.remove("touch-pressed");
});

const audio = new Audio("./audio/music.mp3");
audio.loop = true;
audio.volume = 0.5;

const btn = document.getElementById("audioBtn");
const img = btn.querySelector(".music");
let isPlaying = false;

// Пытаемся запустить музыку при загрузке


// Управление по клику
btn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    img.data = "./img/off.svg";
  } else {
    audio.play();
    isPlaying = true;
    img.data = "./img/on.svg";
  }
});

const audioBtn = document.getElementById("audioBtn");

function handleScroll() {
  // Получаем позицию кнопки относительно документа
  const btnRect = audioBtn.getBoundingClientRect();
  const scrollY = window.scrollY;

  // Исходная позиция кнопки (запоминаем при первом вызове)
  if (!audioBtn.dataset.originalTop) {
    audioBtn.dataset.originalTop = btnRect.top + scrollY;
  }

  const originalTop = parseFloat(audioBtn.dataset.originalTop);

  // Если докрутили до кнопки или ниже
  if (scrollY >= originalTop) {
    audioBtn.classList.add("fixed");
  } else {
    audioBtn.classList.remove("fixed");
  }
}

// Слушаем событие прокрутки
window.addEventListener("scroll", handleScroll);
// Вызываем один раз при загрузке, чтобы установить начальное состояние
handleScroll();
