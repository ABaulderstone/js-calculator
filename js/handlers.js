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
  const displayText = state.get('displayText');
  state.set('prevNumber', delinatedStringToNumber(displayText));
  //remove equals from previous result equation
  state.get('prevNumber') &&
    state.set('secondInput', !state.get('secondInput'));

  const savedEquation = state.get('savedEquation');
  savedEquation && overwriteEquation(removeResultFromEquation(savedEquation));

  const operator = e.target.innerText;
  state.set('operator', operator);
  //style button and add to equation text
  setSelected(e.target);
  writeToEquation(operator);

  //set current number to null and save whatever is in display as prev number
};

export const numberHandler = (e) => {
  clearSelected();
  if (state.get('secondInput')) {
    state.updateDisplayText('');
    state.toggleSecondInput();
  }

  writeToDisplay(state.get('displayText'));
  const inputNumber = e.target.innerText;
  const displayText = state.get('displayText');
  writeToEquation(inputNumber);
  const updatedText = displayText + inputNumber;
  console.log(updatedText);
  state.set('displayText', updateStringtoLocale(updatedText));
  console.log(state.get('displayText'));
  writeToDisplay(state.get('displayText'));
};

export const equalsHandler = (e) => {
  const prevNumber = state.get('prevNumber');
  const result = state.get('result');

  const displayText = state.get('displayText');
  state.set('currentNumber', delinatedStringToNumber(displayText));

  const currentNumber = state.get('currentNumber');

  const operator = state.get('operator');
  if (prevNumber && currentNumber && operator) {
    const answer = arithmetic(result || prevNumber, currentNumber, operator);
    console.log(answer);
    // update dom
    writeToEquation(`=${answer}`);
    writeToDisplay(answer);
    // reset state
    state.set('result', answer);
    state.set('prevNumber', null);
    state.set('currentNumber', null);
    state.set('operator', null);
    state.set(
      'savedEquation',
      document.getElementById('equationText').innerText
    );
    return;
  }

  // if no last equation return
  const savedEquation = state.get('savedEquation');
  if (!savedEquation) return;

  // if no prev number select last operator and number
  const [lastOperator, lastValue] =
    retreiveLastOperationFromEquation(savedEquation);
  const answer = arithmetic(
    state.get('result'),
    parseFloat(lastValue),
    lastOperator
  );

  // TODO TIDY
  state.set('result', answer);
  const newEquation =
    removeResultFromEquation(savedEquation) + lastOperator + lastValue;
  console.log(newEquation);
  overwriteEquation(newEquation + '=' + answer);
  state.set('savedEquation', document.getElementById('equationText').innerText);

  writeToDisplay(answer);
};

export const periodHandler = (e) => {
  const displayText = state.get('displayText');
  if (/\.+/.test(displayText)) return;
  state.set('displayText', displayText + '.');
  writeToEquation('.');
};
export const allClearHandler = (e) => {
  e.preventDefault();
  setDefaults();
  state.resetState();
};
