import React, { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, signupRequest } from "../../network";
import { actionTypes } from "../dataContext/actionTypes";
import { useDataContext } from "../dataContext/dataContext";
const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);
const useAuth = () => {
  let existingToken = JSON.parse(localStorage.getItem("token"));
  let existingUser = JSON.parse(localStorage.getItem("userData"));
  const [token, setToken] = useState(existingToken?.token);
  const [authed, setAuthed] = useState(existingToken ? true : false);
  const [userData, setUserData] = useState(existingUser?.user);

  const { dispatch } = useDataContext();

  const login = async (email, password) => {
    dispatch({ type: actionTypes.fetchData });
    try {
      const { data } = await loginRequest(email, password);
      console.log('data',data)
      dispatch({ type: actionTypes.fetchSuccess });
      setAuthed(true);
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
      dispatch({ type: actionTypes.fetchFailed, payload: error });
      setAuthed(false);
    }
  };
  const signUp = async (firstName, lastName, email, password) => {
    dispatch({ type: actionTypes.fetchData });
    try {
      const { data } = await signupRequest(
        firstName,
        lastName,
        email,
        password
      );
      dispatch({ type: actionTypes.fetchSuccess });
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
      dispatch({ type: actionTypes.fetchFailed, payload: error });
      setAuthed(false);
    }
  };
  return { authed, login, userData, token, signUp };
};
const AuthProvider = ({ children }) => {
  const { authed, login, userData, signUp, token } = useAuth();
  const value = { authed, login, userData, signUp, token };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthProvider, useAuthContext };
