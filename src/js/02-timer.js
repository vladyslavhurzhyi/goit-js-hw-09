import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const inputRef = document.querySelector('#datetime-picker');
const btnStartRef = document.querySelector('BUTTON[data-start]');

const dataDays = document.querySelector('SPAN[data-days]');
const dataHours = document.querySelector('SPAN[data-hours]');
const dataMinutes = document.querySelector('SPAN[data-minutes]');
const dataSeconds = document.querySelector('SPAN[data-seconds]');

btnStartRef.disabled = true;

let timerDate = {};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    timerDate = selectedDates[0];
    checkDate();
  },
};

flatpickr(inputRef, options);

let currentData = Date.now();

function checkDate() {
  if (timerDate > currentData) {
    btnStartRef.disabled = false;
  } else {
    Notiflix.Notify.failure('Выберите дату в будущем');
  }
}

const timer = {
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }

    Notiflix.Notify.success('Таймер запущен');
    this.isActive = true;
    setInterval(() => {
      const startTme = Date.now();
      let deltaTime = timerDate - startTme;
      if (deltaTime > 100) {
        let timerComponents = convertMs(deltaTime);

        updateClock(timerComponents);
      }
    }, 1000);
  },
};

btnStartRef.addEventListener('click', timer.start);

function updateClock({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  // console.log(seconds);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
