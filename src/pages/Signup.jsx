import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "./Authentication.js";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await registerUser(name, email, password);
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <h1>Sign Up</h1>
      <div className="form">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@gmail.com" />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      </div>
      <button onClick={handleSignup} className="button">Sign Up</button>
    </>
  );
};

export default Signup;
