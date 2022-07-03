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

export const writeToDisplay = (number) => {
  document.getElementById('displayText').innerText =
    numberToLocaleString(number);
};

export const setDefaults = () => {
  document.getElementById('displayText').innerText = '0';
  document.getElementById('equationText').innerText = '';
  document.getElementById('errorText').innerText = '';
};
