import axios from "axios";

const signupRequest = async (firstName, lastName, email, password) => {
  const reqObj = { firstName, lastName, email, password };
  return axios.post("/api/auth/signup", reqObj);
};
const loginRequest = async (email, password) =>
  axios.post("/api/auth/login", {
    email,
    password,
  });

export { signupRequest, loginRequest };
