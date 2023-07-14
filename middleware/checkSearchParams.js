export default function checkSearchParams(origin, destination, minprice, maxprice) {
  const regString = /^[A-Z][a-z]+(?:[, -][A-Z][a-z]+)*$/;
  const regNum = /^\d+$/;
  let error = '';
  if (!regString.test(origin)) {
    error += 'Incorrect origin location. ';
  }
  if (!regString.test(destination)) {
    error += 'Incorrect destination. ';
  }
  if (!regNum.test(minprice) || minprice < 0) {
    error += 'Incorrect minimum price. ';
  }
  if (!regNum.test(maxprice) || maxprice <= 0) {
    error += 'Incorrect maximum price. ';
  }
  if (minprice > maxprice) {
    error += 'Minimum price cannot be larger than maximum price. ';
  }
  return [error, origin, destination, minprice, maxprice];
}
