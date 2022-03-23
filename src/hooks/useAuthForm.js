import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function useAuthForm() {
  const [inputs, setInputs] = useState({});
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };
  return { inputs, setInputs, state, navigate, handleChange };
}
