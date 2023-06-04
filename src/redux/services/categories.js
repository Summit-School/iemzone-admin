import axios from "axios";

const URL = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/category`;

const categories = async () => {
  const response = await axios.get(`${URL}/categories`);
  return response.data;
};

const createCategory = async (data) => {
  const response = await axios.post(`${URL}/create-category`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const deleteCategory = async (id) => {
  await axios.delete(`${URL}/delete-category/${id}`);
  const response = await categories();
  return response;
};

const categoryServices = {
  createCategory,
  deleteCategory,
  categories,
};

export default categoryServices;
