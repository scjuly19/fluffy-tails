import React, { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, signupRequest } from "../../network";
import { actionTypes } from "../dataContext/actionTypes";
const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);
const useAuth = () => {
  let existingToken = JSON.parse(localStorage.getItem("token"));
  let existingUser = JSON.parse(localStorage.getItem("userData"));
  const [token, setToken] = useState(existingToken?.token);
  const [authed, setAuthed] = useState(existingToken ? true : false);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState(existingUser?.user);

  const login = async (email, password) => {
    setLoader(true)
    try {
      const { data } = await loginRequest(email, password);
      setAuthed(true);
      setLoader(false)
      setToken(data.encodedToken);
      localStorage.setItem(
        "token",
        JSON.stringify({ token: data.encodedToken })
      );
      localStorage.setItem(
        "userData",
        JSON.stringify({ user: data.foundUser })
      );
      setUserData(data.foundUser);
    } catch (error) {
      setAuthed(false);
      setLoader(false)

    }
  };
  const signUp = async (firstName, lastName, email, password) => {
    try {
      const { data } = await signupRequest(
        firstName,
        lastName,
        email,
        password
      );
      setAuthed(true);
      setToken(data.encodedToken);
      localStorage.setItem(
        "token",
        JSON.stringify({ token: data.encodedToken })
      );
      localStorage.setItem(
        "userData",
        JSON.stringify({ user: data.createdUser })
      );
    } catch (error) {
      setAuthed(false);
    }
  };
  return { authed, login, userData, token, signUp,loader };
};
const AuthProvider = ({ children }) => {
  const { authed, login, userData, signUp, token,loader } = useAuth();
  const value = { authed, login, userData, signUp, token,loader };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthProvider, useAuthContext };
