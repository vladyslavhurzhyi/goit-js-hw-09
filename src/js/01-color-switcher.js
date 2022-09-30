const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('BODY');

startBtnRef.addEventListener('click', clickStart);
stopBtnRef.addEventListener('click', clickStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  bodyRef.style.backgroundColor = getRandomHexColor();
}

let timerId = null;

function clickStart() {
  startBtnRef.disabled = true;
  timerId = setInterval(() => {
    changeColor();
  }, 1000);
}

function clickStop() {
  clearInterval(timerId);
  startBtnRef.disabled = false;
}
