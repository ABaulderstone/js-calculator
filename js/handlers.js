import {
  setSelected,
  clearSelected,
  writeToEquation,
  writeToDisplay,
  setDefaults,
} from './dom-updates.js';

import { arithmetic } from './math.js';

import useState from './state.js';
import { delinatedStringToNumber } from './transformations.js';
const state = useState();

export const operatorHandler = (e) => {
  e.preventDefault();
  const operator = e.target.innerText;
  state.updateOperator(operator);
  setSelected(e.target);
  writeToEquation(operator);
  state.updatePrevNumber(state.getCurrentNumber());
  state.updateCurrentNumber(null);
};

export const numberHandler = (e) => {
  e.preventDefault();
  clearSelected();
  const inputNumber = e.target.innerText;
  writeToEquation(inputNumber);
  if (state.getCurrentNumber()) {
    const displayValue = document.getElementById('displayText').innerText;
    const updatedValue =
      (displayValue === '0' ? '' : displayValue) + inputNumber;
    state.updateCurrentNumber(delinatedStringToNumber(updatedValue));
  } else {
    state.updateCurrentNumber(delinatedStringToNumber(inputNumber));
  }
  writeToDisplay(state.getCurrentNumber());
};

export const equalsHandler = (e) => {
  e.preventDefault();
  const prevNumber = state.getPrevNumber();
  const currentNumber = state.getCurrentNumber();
  const operator = state.getCurrentOperator();
  console.log(operator);
  if (prevNumber && currentNumber && operator) {
    const result = arithmetic(prevNumber, currentNumber, operator);
    writeToEquation(`=${result}`);
    writeToDisplay(result);
    state.updateCurrentNumber(result);
    state.updateOperator(null);
    state.updateSavedEquation(
      document.getElementById('equationText').innerText
    );
  }
};

export const allClearHandler = (e) => {
  e.preventDefault();
  setDefaults();
  state.resetState();
};
