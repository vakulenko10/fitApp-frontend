
import React from "react"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [showNameField, setShowNameField] = useState(false);
  const navigate = useNavigate(); 

  const handleSignInClick = () => {
    navigate("/signup"); 
  };

  return (
    <>
      <h1>Login</h1>
      <div className="form">
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
        <p>
          Don't have an account?{" "}
          <button onClick={handleSignInClick} className="button">
            Sign In
          </button>
        </p>
      </div>
    </>
  );
};

export default Login;
