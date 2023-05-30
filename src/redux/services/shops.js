import axios from "axios";

const URL = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/shop`;

const shops = async () => {
  const response = await axios.get(`${URL}/shops`);
  return response.data;
};

const shop = async (id) => {
  const response = await axios.get(`${URL}/shop-details/${id}`);
  return response.data;
};

const verifyShop = async (data) => {
  const response = await axios.put(`${URL}/change-status/${data.id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  await axios.get(`${URL}/shops`);
  return response.data;
};

const shopServices = {
  verifyShop,
  shops,
  shop,
};

export default shopServices;
