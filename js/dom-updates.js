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

export const writeToDisplay = (content) => {
  document.getElementById('displayText').innerText += content;
};
