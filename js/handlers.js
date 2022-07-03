import {
  setSelected,
  clearSelected,
  writeToEquation,
  writeToDisplay,
} from './dom-updates.js';

export const operatorHandler = (e) => {
  e.preventDefault();
  setSelected(e.target);
};

export const numberHandler = (e) => {
  e.preventDefault();
  clearSelected();
  writeToEquation(e.target.innerText);
  writeToDisplay(e.target.innerText);
};
