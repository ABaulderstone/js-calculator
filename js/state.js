export default (
  initalState = {
    prevNumber: null,
    currentNumber: null,
    selectedOperator: null,
    savedEquation: null,
  }
) => {
  const state = {
    ...initalState,
  };

  return {
    getPrevNumber() {
      return state.prevNumber;
    },
    updatePrevNumber(input) {
      state.prevNumber = Number(input);
    },
    getCurrentNumber() {
      return state.currentNumber;
    },
    updateCurrentNumber(input) {
      if (input === null) {
        state.currentNumber = null;
        return;
      }
      state.currentNumber = Number(input);
    },
    getCurrentOperator() {
      return state.currentOperator;
    },
    updateOperator(input) {
      state.currentOperator = input;
    },
    getSavedEquation() {
      return state.savedEquation;
    },
    updateSavedEquation(input) {
      state.savedEquation = input;
    },

    resetState() {
      for (let key in initalState) {
        state[key] = initalState[key];
      }
    },
  };
};
