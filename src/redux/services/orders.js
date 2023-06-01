import axios from "axios";

const URL = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/order`;

const orders = async () => {
  const response = await axios.get(`${URL}/orders`);
  return response.data;
};

const order = async (id) => {
  const response = await axios.get(`${URL}/order/${id}`);
  return response.data;
};

const orderServices = {
  order,
  orders,
};

export default orderServices;
