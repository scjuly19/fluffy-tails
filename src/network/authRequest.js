import axios from "axios";
import { ENDPOINTS } from "./urls";
const { LOGIN, SIGN_UP } = ENDPOINTS;
const signupRequest = async (firstName, lastName, email, password) => {
  const reqObj = { firstName, lastName, email, password };
  return axios.post(SIGN_UP, reqObj);
};
const loginRequest = async (email, password) =>
  axios.post(LOGIN, {
    email,
    password,
  });

export { signupRequest, loginRequest };
