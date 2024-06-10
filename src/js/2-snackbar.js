'use strict';

//Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів//
import 'izitoast/dist/css/iziToast.min.css';


const formEl = document.forms[0];

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const userChosenStatus = e.target.state.value;
  const userChosenDelay = e.target.delay.value;
  const promise = createPromise(userChosenDelay, userChosenStatus);
  showMessage(promise);
  e.target.reset();
});

function createPromise(delay, promStatus) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      promStatus === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
}

function iziToastAction(delay, status='fulfilled') {
  const message =
    status === 'fulfilled'
      ? `✅ Fulfilled promise in ${delay}ms`
      : `❌ Rejected promise in ${delay}ms`;
  const bgColor = status === 'fulfilled' ? '#59A10D' : '#EF4040';

  iziToast.show({
    icon: false,
    backgroundColor: `${bgColor}`,
    message: `${message}`,
    messageColor: 'black',
    messageSize: '16',
    position: 'topRight',
    close: false,
    displayMode: 1,
  });
}

function showMessage(promise) {
  promise.then(delay => iziToastAction(delay))
    .catch(delay => iziToastAction(delay, 'r'));
}
