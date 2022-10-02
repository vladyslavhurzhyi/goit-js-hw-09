import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

const btnSubmRef = formRef.lastElementChild;

btnSubmRef.addEventListener('click', event => {
  event.preventDefault();

  let delayRef = formRef.elements.delay.value;
  let amountValue = formRef.elements.amount.value;
  let stepRef = formRef.elements.step.value;
  let positionNumber = 0;
  let stepNumber = Number(delayRef) - Number(stepRef);

  for (let i = 0; i < Number(amountValue); i += 1) {
    positionNumber += 1;

    stepNumber += Number(stepRef);

    createPromise(positionNumber, stepNumber)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
