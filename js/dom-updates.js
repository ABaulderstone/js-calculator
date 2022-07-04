import { numberToLocaleString } from './transformations.js';

export const clearSelected = () => {
  document.querySelector('.selected')?.classList.remove('selected');
};

export const setSelected = (element) => {
  clearSelected();
  element.classList.add('selected');
};

export const writeToEquation = (content) => {
  document.getElementById('equationText').innerText += content;
};

export const writeToDisplay = (str) => {
  document.getElementById('displayText').innerText = str;
};

export const setDefaults = () => {
  document.getElementById('displayText').innerText = '0';
  document.getElementById('equationText').innerText = '';
  document.getElementById('errorText').innerText = '';
};

export const overwriteEquation = (newEquation) => {
  document.getElementById('equationText').innerText = newEquation;
};
