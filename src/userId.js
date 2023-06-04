import jwt_decode from "jwt-decode";

const userId = () => {
  const token = localStorage.getItem("iemzone-admin");
  var decoded = jwt_decode(token);
  return decoded.id;
};
export default userId;
