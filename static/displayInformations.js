// eslint-disable-next-line no-unused-vars
const displayInformations = async (trainID, divID) => {
  try {
    const response = await fetch(`/api/${trainID}`);
    const jsonObject = await response.json();
    if (!response.ok) {
      document.getElementById(`errdiv_${divID}`).innerText = jsonObject.message;
    } else {
      document.getElementById(`traintypediv_${divID}`).innerText = `Train type: ${jsonObject[0].traintype}`;
      document.getElementById(`pricediv_${divID}`).innerText = `Price: ${jsonObject[0].price}`;
      document.getElementById(`errdiv_${divID}`).innerText = '';
    }
  } catch (error) {
    document.getElementById(`errdiv_${divID}`).innerText = error;
  }
};
