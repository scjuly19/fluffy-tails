import React, { createContext, useContext, useState, useEffect } from "react";
import { loginRequest } from "../../network";
import { actionTypes } from "../dataContext/actionTypes";
import { useDataContext } from "../dataContext/dataContext";
const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);
const useAuth = () => {
  let existingToken = JSON.parse(localStorage.getItem("token"));
  let existingUser =JSON.parse(localStorage.getItem("userData"));
  const [token, setToken] = useState(existingToken ?. token);
  const [authed, setAuthed] = useState(existingToken ? true : false);
  const [userData, setUserData] = useState(existingUser ?. user);
console.log(token,userData)
  const { dispatch } = useDataContext();

  const login = async (email, password) => {
    dispatch({ type: actionTypes.fetchData });
    try {
      const { data } = await loginRequest(email, password);
      dispatch({ type: actionTypes.fetchSuccess });
      setAuthed(true);
      setToken(data.encodedToken);
      console.log(data)
      localStorage.setItem("token", JSON.stringify({token:data.encodedToken}));
      localStorage.setItem("userData", JSON.stringify({user:data.foundUser}));
      setUserData(data.foundUser);
    } catch (error) {
      console.log('err',error)
      dispatch({ type: actionTypes.fetchFailed, payload: error });
      setAuthed(false);
    }
  };
  return { authed, login, userData, token };
};
const AuthProvider = ({ children }) => {
  const { authed, login, userData } = useAuth();
  const value = { authed, login, userData };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthProvider, useAuthContext };
