import axios from "axios";

const URL = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/admin`;

const login = async (data) => {
  const response = await axios.post(`${URL}/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.data) {
    localStorage.setItem("iemzone-admin", JSON.stringify(response.data.token));
  }

  return response.data;
};

const authServices = {
  login,
};

export default authServices;
