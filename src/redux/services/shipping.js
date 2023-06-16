import axios from "axios";

const URL = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/shipping`;

const getShippingFee = async () => {
  const response = await axios.get(`${URL}/get-shipping-fee`);
  return response.data;
};

const updateShippingFee = async (data) => {
  const response = await axios.post(`${URL}/shipping-fee`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const categoryServices = {
  updateShippingFee,
  getShippingFee,
};

export default categoryServices;
