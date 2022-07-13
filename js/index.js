// import {
//   operatorHandler,
//   numberHandler,
//   allClearHandler,
//   equalsHandler,
//   periodHandler,
// } from './handlers.js';

// document
//   .querySelectorAll('.operator')
//   .forEach((element) => element.addEventListener('click', operatorHandler));

// document
//   .querySelectorAll('.number')
//   .forEach((element) => element.addEventListener('click', numberHandler));

// document.getElementById('allClear').addEventListener('click', allClearHandler);

// document.getElementById('equals').addEventListener('click', equalsHandler);

// document.getElementById('period').addEventListener('click', periodHandler);

import { Calculator } from './Calculator.js';
const numbers = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const acButton = document.getElementById('allClear');
const equalsButton = document.getElementById('equals');
const periodButton = document.getElementById('period');

const displayNode = document.getElementById('displayText');
const equationNode = document.getElementById('equationText');

const calculator = new Calculator(
  numbers,
  operatorButtons,
  equalsButton,
  periodButton,
  acButton,
  displayNode,
  equationNode
);
