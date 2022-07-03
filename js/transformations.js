export const delinatedStringToNumber = (str) => {
  const sanitisedString = str.replace(/,/g, '');
  return Number(sanitisedString);
};

export const numberToLocaleString = (number) => {
  return number.toLocaleString('en-US');
};

export const removeResultFromEquation = (str) => {
  return str.split('=')[0];
};

export const addDecimalToString = (str) => {
  return /\.+/.test(str) ? str : str + '.';
};
