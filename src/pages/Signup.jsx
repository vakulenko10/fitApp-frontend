import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  return (
    <>
      <h1>Sign in</h1>
      <div className="form">
        <label>Name</label>
        <input type="text" placeholder="Enter your name" />
        <label>Email:</label>
        <input type="text" placeholder="name@gmail.com" />
        <label>Password:</label>
        <input type="password" placeholder="Password" />
      </div>
      <div>
        <div>
          <input type="checkbox" />
          <label>Remember the password</label>
        </div>
        <button className="button">Login</button>
      </div>
    </>
  );
};

export default Signup;
