import React from 'react'
import {
  Link
} from "react-router-dom";
import { useAuthContext } from '../context/authContext/authContext';
import { useAuthForm } from '../hooks/useAuthForm';
export function Signup() {
  const{signUp}=useAuthContext();
  const { inputs, navigate,handleChange } = useAuthForm();



/**Hanldes singup action */
  const handleSingup=e=>{
    e.preventDefault();
    const { firstName,lastName,email, password } = inputs;
    signUp(firstName,lastName,email, password).then(() => navigate( "/products"))
  }
  return (
<main>
        <h2 className="text-center uppercase">Create Account</h2>
        <form className="form-wrapper" onSubmit={handleSingup}>
            <label htmlFor="firstname" className="uppercase">First Name</label>
          <input
            type="text"
            id="firstname"
            className="block input basic-input form-input"
            name="firstName"
            onChange={handleChange}
            value={inputs.firstName || ""}
          />
          <label htmlFor="lastname" className="uppercase mt-16 block">Last Name</label>
          <input
            type="text"
            id="lastname"
            className="block input basic-input form-input"
            name="lastName"
            onChange={handleChange}
            value={inputs.lastName || ""}
          />
          <label htmlFor="email" className="uppercase mt-16 block">Email</label>
          <input
            type="text"
            id="email"
            className="block input basic-input form-input"
            name="email"
            onChange={handleChange}
            value={inputs.email || ""}
          />

          <label htmlFor="password" className="mt-16 block uppercase">Password</label>
          <input
            type="text"
            id="password"
            className="block input basic-input form-input"
            name="password"
            onChange={handleChange}
            value={inputs.password || ""}
          />
          <div className="flex mt-16">
            <button className="btn primary-btn uppercase" type='submit'>Signup</button>
            <Link className="btn outline-btn ml-8 uppercase" to="/login">Login</Link>
          </div>
        </form>
      </main>  )
}
