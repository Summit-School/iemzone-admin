import axios from "axios";

const URL = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/auth`;

const users = async () => {
  const response = await axios.get(`${URL}/users`);
  return response.data;
};

const user = async (id) => {
  const response = await axios.get(`${URL}/user/${id}`);
  return response.data;
};

const authServices = {
  user,
  users,
};

export default authServices;
