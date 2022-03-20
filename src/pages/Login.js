import React ,{useState} from "react";
import "../styles/login.css";
import "../styles/form.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAuthContext } from "../context/authContext/authContext";
export function Login() {
  const { authed, login, userData } = useAuthContext();
  const[inputs,setInputs]=useState({});

  const { state } = useLocation();

  const navigate = useNavigate();
const handleChange=e=>{
  e.preventDefault();
  let name=e.target.name;
  let value=e.target.value;
  setInputs({...inputs,[name]:value})
}
  const handleLogin = (e) => {
    e.preventDefault();
   const{email,password}=inputs;
   console.log(email,password)
    login(email,password).then(() => navigate(state?.path || "/products"));
  };
  return (
    <main>
      <h2 className="text-center uppercase">Login</h2>
      <form className="form-wrapper" onSubmit={handleLogin}>
        <label htmlFor="email" className="uppercase">
          Email
        </label>
        <input
          name="email"
          type="text"
          id="email"
          className="block input basic-input form-input"
          onChange={handleChange}
          value={inputs.email || ""}
        />

        <label htmlFor="password" className="mt-16 block uppercase">
          Password
        </label>
        <input
          name="password"
          type="password"
          id="password"
          className="block input basic-input form-input"
          onChange={handleChange}
          value={inputs.password || ""}
        />
        <a href="" className="text-underline mt-16">
          Forgot your password?
        </a>
        <div className="flex mt-16">
          <button className="btn primary-btn uppercase" type="submit">
            Login
          </button>
          <Link className="btn outline-btn ml-8 uppercase" to="/signup">
            Signup
          </Link>
        </div>
      </form>
    </main>
  );
}
