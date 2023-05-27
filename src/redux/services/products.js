import axios from "axios";

const URL = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/product`;

const products = async () => {
  const response = await axios.get(`${URL}/products`);
  return response.data;
};

const product = async (id) => {
  const response = await axios.get(`${URL}/product/${id}`);
  return response.data;
};

const productServices = {
  products,
  product,
};

export default productServices;
