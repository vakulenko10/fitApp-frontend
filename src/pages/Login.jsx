
import React from "react"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "./Authentication.js";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      // navigate("/dashboard"); 
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <h1 className="w-full h-[100px] bg-background rounded-sm my-2">Login</h1>
      <div className="bg-primary p-10 rounded-lg my-10 mx-15">
        <div className="">
          <label>Email:</label>
        <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@gmail.com"/>
        </div>
        <div><label>Password:</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>
        <Button variant={"accent"} onClick={handleLogin} className="button" type="onSubmit">Login</Button>
        <p>Don't have an account? <button onClick={() => navigate("/signup")} className="button">Sign Up</button></p>
      </div>
    </>
  );
};

export default Login;
