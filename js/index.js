import { operatorHandler, numberHandler, allClearHandler } from './handlers.js';

document
  .querySelectorAll('.operator')
  .forEach((element) => element.addEventListener('click', operatorHandler));

document
  .querySelectorAll('.number')
  .forEach((element) => element.addEventListener('click', numberHandler));

document.getElementById('allClear').addEventListener('click', allClearHandler);
