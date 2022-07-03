export default (
  initalState = { prevNumber: null, currentNumber: 0, selectedOperator: null }
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
      state.currentNumber = Number(input);
    },
    getCurrentOperator() {
      return state.currentOperator;
    },
    updateOperator(input) {
      state.currentOperator = input;
    },

    resetState() {
      for (let key in initalState) {
        state[key] = initalState[key];
      }
    },
  };
};
