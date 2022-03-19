import React from 'react'
import {
  Link
} from "react-router-dom";
export function Signup() {
  return (
<main>
        <h2 className="text-center uppercase">Create Account</h2>
        <form className="form-wrapper">
            <label htmlFor="firstname" className="uppercase">First Name</label>
          <input
            type="text"
            id="firstname"
            className="block input basic-input form-input"
          />
          <label htmlFor="lastname" className="uppercase mt-16 block">Last Name</label>
          <input
            type="text"
            id="lastname"
            className="block input basic-input form-input"
          />
          <label htmlFor="email" className="uppercase mt-16 block">Email</label>
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
          <div className="flex mt-16">
            <button className="btn primary-btn uppercase" >Signup</button>
            <Link className="btn outline-btn ml-8 uppercase" to="/login">Login</Link>
          </div>
        </form>
      </main>  )
}
