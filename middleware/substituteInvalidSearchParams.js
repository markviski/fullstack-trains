export default function substituteInvalidSearchParams(origin, destination, minprice, maxprice) {
  const regString = /^[A-Z][a-z]+(?:[, -][A-Z][a-z]+)*$/;
  const regNum = /^\d+$/;
  let error = '';
  let o = origin;
  let d = destination;
  let minp = minprice;
  let maxp = maxprice;
  if (!regString.test(o)) {
    o = '%';
  }
  if (!regString.test(d)) {
    d = '%';
  }
  if (!regNum.test(minp)) {
    error += 'Incorrect minimum price. ';
  }
  if (minp < 0) {
    minp = 0;
  }
  if (!regNum.test(maxp)) {
    error += 'Incorrect maximum price. ';
  }
  if (maxp <= 0) {
    maxp = 2147483646;
  }
  if (minp > maxp) {
    error += 'Minimum price cannot be larger than maximum price. ';
  }
  return [error, o, d, minp, maxp];
}
