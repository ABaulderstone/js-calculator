export const delinatedStringToNumber = (str) => {
  const sanitisedString = str.replace(/,/g, '');
  return Number(sanitisedString);
};

export const numberToLocaleString = (number) => {
  return number.toLocaleString('en-US');
};
