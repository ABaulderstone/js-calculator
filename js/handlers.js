import {
  setSelected,
  clearSelected,
  writeToEquation,
  writeToDisplay,
  setDefaults,
} from './dom-updates.js';

import useState from './state.js';
import { delinatedStringToNumber } from './transformations.js';
const state = useState();

export const operatorHandler = (e) => {
  e.preventDefault();
  setSelected(e.target);
  writeToEquation(e.target.innerText);
  state.updatePrevNumber(state.getCurrentNumber());
  state.updateCurrentNumber(null);
};

export const numberHandler = (e) => {
  e.preventDefault();
  clearSelected();
  writeToEquation(e.target.innerText);
  if (state.getCurrentNumber()) {
    const displayValue = document.getElementById('displayText').innerText;
    const updatedValue =
      (displayValue === '0' ? '' : displayValue) + e.target.innerText;
    state.updateCurrentNumber(delinatedStringToNumber(updatedValue));
  } else {
    state.updateCurrentNumber(delinatedStringToNumber(e.target.innerText));
  }
  writeToDisplay(state.getCurrentNumber());
};

export const allClearHandler = (e) => {
  e.preventDefault();
  setDefaults();
  state.resetState();
};
