import useState from './state.js';
import { arithmetic } from './math.js';
import { getLastOperator } from './helpers.js';
import { clearSelected, setSelected } from './dom-updates.js';
import {
  updateStringtoLocale,
  removeResultFromEquation,
  delinatedStringToNumber,
} from './transformations.js';
export class Calculator {
  constructor(
    numberButtons,
    operatorButtons,
    equalsButton,
    periodButton,
    allClearButton,
    displayNode,
    equationNode
  ) {
    this.state = useState({
      prevNumber: null,
      currentNumber: null,
      selectedOperator: null,
      savedEquation: '',
      displayText: '',
      secondInput: false,
      result: null,
    });

    this.numberButtons = numberButtons;
    this.operatorButtons = operatorButtons;
    this.equalsButton = equalsButton;
    this.periodButton = periodButton;
    this.allClearButton = allClearButton;
    this.displayNode = displayNode;
    this.equationNode = equationNode;

    this.addListeners();
  }

  calculate() {
    const {
      prevNumber,
      currentNumber,
      selectedOperator = getLastOperator(this.equationNode.innerText),
    } = this.state.getState();
    const answer = arithmetic(prevNumber, currentNumber, selectedOperator);
    this.state.setState({
      result: answer,
      prevNumber: answer,
      currentNumber: null,
      selectedOperator: null,
    });
    this.updateEquation(answer, true);
  }

  updateDisplay(value, overwrite) {
    const { displayText } = this.state.getState();
    if (displayText.length > 12) return;
    const formattedText = overwrite
      ? updateStringtoLocale(value)
      : updateStringtoLocale(displayText + value);
    this.state.set('displayText', formattedText);
    this.displayNode.innerText = formattedText;
  }

  updateEquation(value, overwrite) {
    const { savedEquation, result } = this.state.getState();
    const lastChar = savedEquation.charAt(savedEquation.length - 1);
    let updatedEquation = savedEquation;
    if (/[\+−×÷]/.test(lastChar) && /[\+−×÷]/.test(value)) {
      updatedEquation = savedEquation.substring(0, savedEquation.length - 1);
    }

    updatedEquation =
      (overwrite
        ? removeResultFromEquation(updatedEquation)
        : updatedEquation) + value;
    if (updatedEquation.length > 25) {
      updatedEquation = `(${result})${getLastOperator(savedEquation)}${value}`;
    }
    this.state.set('savedEquation', updatedEquation);
    this.equationNode.innerText = updatedEquation;
  }

  addListeners() {
    this.numberButtons.forEach((numberButton) => {
      numberButton.addEventListener('click', (e) => {
        clearSelected();
        const { secondInput } = this.state.getState();
        if (secondInput) {
          this.state.setState({ displayText: '', secondInput: !secondInput });
          console.log(this.state.get('displayText'));
        }

        this.updateDisplay(e.target.innerText);
        this.updateEquation(e.target.innerText);
      });
    });

    this.operatorButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const operator = e.target.innerText;
        const { savedEquation, displayText, prevNumber } =
          this.state.getState();

        if (!displayText && !prevNumber) return;

        setSelected(e.target);
        this.state.set('selectedOperator', operator);
        savedEquation && this.updateEquation(operator);
        displayText &&
          this.state.setState({
            prevNumber: delinatedStringToNumber(displayText),
            secondInput: true,
          });
      });
    });

    this.allClearButton.addEventListener('click', () => {
      clearSelected();
      this.state.resetState();
      this.updateDisplay(0);
      this.updateEquation('');
    });
  }
}
