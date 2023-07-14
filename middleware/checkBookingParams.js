export default function checkBookingParams(userID, trainID) {
  const regNum = /^\d+$/;
  let errStr = '';
  if (!regNum.test(userID)) {
    errStr += 'Invalid passenger ID. ';
  }
  if (!regNum.test(trainID)) {
    errStr += 'Invalid train ID. ';
  }
  return errStr;
}
