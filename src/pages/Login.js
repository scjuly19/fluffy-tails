import React from 'react'
import '../styles/login.css';
import '../styles/form.css';
import {
  Link
} from "react-router-dom";
export default function Login() {
  return (
    <main>
    <h2 className="text-center uppercase">Login</h2>
    <form className="form-wrapper">
      <label htmlFor="email" className="uppercase">Email</label>
      <input
        type="text"
        id="email"
        className="block input basic-input form-input"
      />

      <label htmlFor="password" className="mt-16 block uppercase">Password</label>
      <input
        type="text"
        id="password"
        className="block input basic-input form-input"
      />
      <a href="" className="text-underline mt-16">Forgot your password?</a>
      <div className="flex mt-16">
        <button className="btn primary-btn uppercase">Login</button>
        <Link className="btn outline-btn ml-8 uppercase" to="/signup">Signup</Link>
      </div>
    </form>
  </main>  )
}
