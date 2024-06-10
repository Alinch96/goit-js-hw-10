'use strict';

// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

//Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів//
import 'izitoast/dist/css/iziToast.min.css';


		const refs = {
			input: document.querySelector('#datetime-picker'),
			start: document.querySelector('[data-start]'),
			days: document.querySelector('[data-days]'),
			hours: document.querySelector('[data-hours]'),
			minutes: document.querySelector('[data-minutes]'),
			seconds: document.querySelector('[data-seconds]'),
};


let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
       refs.start.disabled = true;
      addErrorMessage();
    } else {
      refs.start.disabled = false;
      removeErrorMessage();
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(refs.input, options);


refs.start.addEventListener('click', (e) => {

  refs.start.disabled = true;
  //  Або e.target.setAttribute('disabled', '');
  refs.input.setAttribute('disabled', '');

  const intervalId = setInterval(() => {
    renderTime(userSelectedDate);
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
    refs.input.removeAttribute('disabled');
  }, userSelectedDate - Date.now());
});

function renderTime(time) {
  const dateObj = convertMs(time - Date.now());
  refs.days.textContent = addLeadingZero(dateObj.days);
  refs.hours.textContent = addLeadingZero(dateObj.hours);
  refs.minutes.textContent = addLeadingZero(dateObj.minutes);
  refs.seconds.textContent = addLeadingZero(dateObj.seconds);
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

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}


function addErrorMessage() {
  iziToast.error({
    backgroundColor: 'tomato',
    message: 'Please choose a date in the future',
    messageColor: 'white',
    messageSize: '20',
    position: 'topRight',
    close: true,
    displayMode: 2,
  });
}

function removeErrorMessage() {
  iziToast.destroy();
}