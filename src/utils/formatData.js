const formatData = (data, numColumn) => {
  const numberOfFullRows = Math.floor(data.length / numColumn);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumn;
  while (
    numberOfElementsLastRow !== numColumn &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank ${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow = numberOfElementsLastRow + 1;
  }
  return data;
};
export default formatData;
