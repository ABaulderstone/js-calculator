export const getLastOperator = (equationString) => {
  const matches = equationString.match(/[\+−×÷]/g);
  return matches?.length && matches[matches.length - 1];
};
