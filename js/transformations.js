export const delinatedStringToNumber = (str) => {
  const sanitisedString = str.replace(/,/g, '');
  return parseFloat(sanitisedString);
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

export const updateStringtoLocale = (str) => {
  const [left, right] = str.split('.');
  const number = delinatedStringToNumber(left);
  const commaString = numberToLocaleString(number);
  if (!right) return commaString;
  return `${commaString}.${right}`;
};

export const retreiveLastOperationFromEquation = (str) => {
  const [left, right] = str.split('=');
  const [operator, value] = left.substring(left.length - 2).split('');
  return [operator, value];
};
