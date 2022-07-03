import {
  operatorHandler,
  numberHandler,
  allClearHandler,
  equalsHandler,
  periodHandler,
} from './handlers.js';

document
  .querySelectorAll('.operator')
  .forEach((element) => element.addEventListener('click', operatorHandler));

document
  .querySelectorAll('.number')
  .forEach((element) => element.addEventListener('click', numberHandler));

document.getElementById('allClear').addEventListener('click', allClearHandler);

document.getElementById('equals').addEventListener('click', equalsHandler);

document.getElementById('period').addEventListener('click', periodHandler);
