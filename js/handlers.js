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
  updateStringtoLocale,
  retreiveLastOperationFromEquation,
} from './transformations.js';
const state = useState();

export const operatorHandler = (e) => {
  e.preventDefault();
  const displayText = state.getDisplayText();
  state.updatePrevNumber(delinatedStringToNumber(displayText));
  //remove equals from previous result equation
  state.getPrevNumber() && state.toggleSecondInput();

  const savedEquation = state.getSavedEquation();
  savedEquation && overwriteEquation(removeResultFromEquation(savedEquation));

  const operator = e.target.innerText;
  state.updateOperator(operator);
  //style button and add to equation text
  setSelected(e.target);
  writeToEquation(operator);

  //set current number to null and save whatever is in display as prev number
};

export const numberHandler = (e) => {
  e.preventDefault();
  clearSelected();
  if (state.getSecondInput()) {
    state.updateDisplayText('');
    state.toggleSecondInput();
  }

  writeToDisplay(state.getDisplayText());
  const inputNumber = e.target.innerText;
  const displayText = state.getDisplayText();
  writeToEquation(inputNumber);
  const updatedText = displayText + inputNumber;
  console.log(updatedText);
  state.updateDisplayText(updateStringtoLocale(updatedText));
  console.log(state.getDisplayText());
  writeToDisplay(state.getDisplayText());
};

export const equalsHandler = (e) => {
  e.preventDefault();
  const prevNumber = state.getPrevNumber();
  const result = state.getResult();

  const displayText = state.getDisplayText();
  state.updateCurrentNumber(delinatedStringToNumber(displayText));

  const currentNumber = state.getCurrentNumber();

  const operator = state.getCurrentOperator();
  if (prevNumber && currentNumber && operator) {
    const answer = arithmetic(result || prevNumber, currentNumber, operator);
    console.log(answer);
    // update dom
    writeToEquation(`=${answer}`);
    writeToDisplay(answer);
    // reset state
    state.updateResult(answer);
    state.updatePrevNumber(null);
    state.updateCurrentNumber(null);
    state.updateOperator(null);
    state.updateSavedEquation(
      document.getElementById('equationText').innerText
    );
    return;
  }

  // if no last equation return
  const savedEquation = state.getSavedEquation();
  if (!savedEquation) return;

  // if no prev number select last operator and number
  const [lastOperator, lastValue] =
    retreiveLastOperationFromEquation(savedEquation);
  const answer = arithmetic(
    state.getResult(),
    parseFloat(lastValue),
    lastOperator
  );
  state.updateResult(answer);
  const newEquation =
    removeResultFromEquation(savedEquation) + lastOperator + lastValue;
  console.log(newEquation);
  overwriteEquation(newEquation + '=' + answer);
  state.updateSavedEquation(document.getElementById('equationText').innerText);

  writeToDisplay(answer);
};

export const periodHandler = (e) => {
  e.preventDefault();
  const displayText = state.getDisplayText();
  if (/\.+/.test(displayText)) return;
  state.updateDisplayText(displayText + '.');
  writeToEquation('.');
};
export const allClearHandler = (e) => {
  e.preventDefault();
  setDefaults();
  state.resetState();
};
