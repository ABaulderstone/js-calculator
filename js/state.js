export default (
  initalState = {
    prevNumber: null,
    currentNumber: null,
    selectedOperator: null,
    savedEquation: null,
    displayText: '',
    secondInput: false,
    result: null,
  }
) => {
  let state = {
    ...initalState,
  };

  return {
    logState() {
      console.log(state);
    },

    set(key, newValue) {
      if (state[key] === undefined) return;
      state = { ...state, [key]: newValue };
    },

    get(key) {
      return state[key];
    },

    resetState() {
      for (let key in initalState) {
        state[key] = initalState[key];
      }
    },
  };
};
