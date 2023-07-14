export default function checkCreate(origin, destination, weekday, hour, price, traintype) {
  const regString = /^[A-Z][a-z]+(?:[, -][A-Z][a-z]+)*$/;
  const regNum = /^\d+$/;
  let errStr = '';
  if (!regString.test(origin)) {
    errStr += 'Incorrect origin location. ';
  }
  if (!regString.test(destination)) {
    errStr += 'Incorrect destination. ';
  }
  if (!regString.test(weekday)) {
    errStr += 'Incorrect weekday. ';
  }
  if (!regNum.test(hour)) {
    errStr += 'Incorrect hour. ';
  }
  if (!regNum.test(price) || price <= 0) {
    errStr += 'Incorrect price. ';
  }
  if (!regString.test(traintype)) {
    errStr += 'Incorrect train type. ';
  }
  return errStr;
}
