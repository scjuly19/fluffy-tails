import React, { createContext, useContext, useState, useEffect } from "react";
import { loginRequest } from "../../network";
import { actionTypes } from "../dataContext/actionTypes";
import { useDataContext } from "../dataContext/dataContext";
const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);
const useAuth = () => {
  let existingToken,existingUser;
  try{
    existingToken=
    localStorage.getItem("token") && JSON.parse(localStorage.getItem("token"));
  existingUser =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData"));
  }
  catch(err){
    console.log(err)
  }
  const [token, setToken] = useState(existingToken ? existingToken : null);
  const [authed, setAuthed] = useState(existingToken ? true : false);
  const [userData, setUserData] = useState(existingUser ? existingUser : null);

  const { dispatch } = useDataContext();

  const login = async (email, password) => {
    dispatch({ type: actionTypes.fetchData });
    try {
      const { data } = await loginRequest(email, password);
      dispatch({ type: actionTypes.fetchSuccess });
      setAuthed(true);
      setToken(data.encodedToken);
      localStorage.setItem("token", JSON.stringify(data.encodedToken));
      localStorage.setItem("userData", JSON.stringify(data.foundUser));
      setUserData(data.foundUser);
    } catch (error) {
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
