import { operatorHandler, numberHandler } from './handlers.js';

document
  .querySelectorAll('.operator')
  .forEach((element) => element.addEventListener('click', operatorHandler));

document
  .querySelectorAll('.number')
  .forEach((element) => element.addEventListener('click', numberHandler));
// dom functions
