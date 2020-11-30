export default (priceLike) => {
  const price = parseInt(priceLike, 10);
  let letter = '',
    displayValue;
  if (price >= 1000000000) {
    letter = 'b';
    displayValue =
      price % 1000000000 == 0
        ? price / 1000000000
        : (price / 1000000000).toFixed(1);
  }
  if (price >= 1000000 <= 999999999) {
    letter = 'm';
    displayValue =
      price % 1000000 == 0 ? price / 1000000 : (price / 1000000).toFixed(1);
  }
  if (price >= 1000 <= 999999) {
    letter = 'k';
    displayValue = price % 1000 == 0 ? price / 1000 : (price / 1000).toFixed(1);
  }
  return `${displayValue}${letter}`;
};
