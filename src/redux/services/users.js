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

const changeUserStatus = async (data) => {
  await axios.put(`${URL}/change-user-status/${data.id}`, data, {
    heeader: {
      "Content-Type": "application/json",
    },
  });
  const response = await users();
  return response;
};

const authServices = {
  user,
  users,
  changeUserStatus,
};

export default authServices;
