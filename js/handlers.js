import {
  setSelected,
  clearSelected,
  writeToEquation,
  writeToDisplay,
  setDefaults,
  overwriteEquation,
} from './dom-updates.js';

import { arithmetic } from './math.js';

import useState from './state.js';
import {
  delinatedStringToNumber,
  removeResultFromEquation,
  addDecimalToString,
} from './transformations.js';
const state = useState();

export const operatorHandler = (e) => {
  e.preventDefault();

  //remove equals from previous result equation
  const savedEquation = state.getSavedEquation();
  savedEquation && overwriteEquation(removeResultFromEquation(savedEquation));

  const operator = e.target.innerText;
  state.updateOperator(operator);
  //style button and add to equation text
  setSelected(e.target);
  writeToEquation(operator);

  //set current number to null and save whatever is in display as prev number
  state.updatePrevNumber(state.getCurrentNumber());
  state.updateCurrentNumber(null);
};

export const numberHandler = (e) => {
  e.preventDefault();
  clearSelected();
  const inputNumber = e.target.innerText;
  writeToEquation(inputNumber);
  const currentNumber = state.getCurrentNumber();
  const displayValue = document.getElementById('displayText').innerText;

  if (currentNumber) {
    // if current number add to it, starting number is 0 so disregard
    const displayValue = document.getElementById('displayText').innerText;
    const updatedValue =
      (displayValue === '0' ? '' : displayValue) + inputNumber;
    console.log(updatedValue);
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
  if (prevNumber && currentNumber && operator) {
    const result = arithmetic(prevNumber, currentNumber, operator);
    console.log(result);
    // update dom
    writeToEquation(`=${result}`);
    writeToDisplay(result);
    // reset state
    state.updateCurrentNumber(result);
    state.updateOperator(null);
    state.updateSavedEquation(
      document.getElementById('equationText').innerText
    );
  }
};

export const periodHandler = (e) => {
  e.preventDefault();
  const displayText = document.getElementById('displayText').innerText;
  if (/\.+/.test(displayText)) return;
  writeToDisplay(displayText + '.');
  writeToEquation('.');
};
export const allClearHandler = (e) => {
  e.preventDefault();
  setDefaults();
  state.resetState();
};
