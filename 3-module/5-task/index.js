function getMinMax(str) {
  let numbers = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
  let newStr = str.match(numbers).map((str) => Number(str));
  return {
    min: Math.min(...newStr),
    max: Math.max(...newStr),
  };
}
