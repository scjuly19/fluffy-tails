import axios from "axios";

const signupRequest = async (firstName, lastName, email, password) => {
  axios.post("/api/auth/signup", {
    email,
    password,
    firstName,
    lastName,
  });
};
const loginRequest=async(email,password)=>
    axios.post("/api/auth/login", {
        email,
        password
      });

export {signupRequest,loginRequest};