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

    setState(obj) {
      if (Object.getPrototypeOf(obj) !== Object.prototype) return;

      for (let key in obj) {
        this.set(key, obj[key]);
      }
    },
    getState() {
      return { ...state };
    },

    resetState() {
      state = { ...initalState };
    },
  };
};
