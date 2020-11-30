const formatData = (data, numColumn) => {
  // Object.keys(data).map((key) => {
  //   console.log(data[key]);
  // });
  // var obj = { ...data, ...types };
  const numberOfFullRows = Math.floor(data.length / numColumn);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumn;
  while (
    numberOfElementsLastRow !== numColumn &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ empty: true });
    numberOfElementsLastRow = numberOfElementsLastRow + 1;
  }
  // console.log(obj);
  return data;
};
export default formatData;
