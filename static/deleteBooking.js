// eslint-disable-next-line no-unused-vars
const deleteBooking = async (foglalasID) => {
  try {
    const response = await fetch(`/api/delete_booking/${foglalasID}`, { method: 'DELETE' });
    const jsonObject = await response.json();
    if (!response.ok) {
      document.getElementById('info').innerText = '';
    } else {
      document.getElementById(`passenger_${foglalasID}`).remove();
      document.getElementById('info').innerText = jsonObject.message;
      document.getElementById('error').innerHTML = '';
    }
  } catch (error) {
    document.getElementById('info').innerText = '';
    document.getElementById('error').innerHTML = 'Could not delete booking.';
  }
};
