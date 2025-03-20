
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
      <div className="flex flex-col justify-center items-center min-h-screen" >
        <h1 className=" h-[100px] bg-background rounded-sm text-center w-full max-w-[330px] md:max-w-[600px] md:hidden">
          Login
        </h1>
        <div className="bg-primary p-10 rounded-lg w-full max-w-[330px] md:max-w-[600px] lg:max-w-[510px]">
          <h1 className=" h-[100px] rounded-sm text-center flex justify-center items-center w-full max-w-[330px] md:max-w-[600px] lg:max-w-[510px] hidden md:flex">
            Login
          </h1>
          <div>
            <label>Email:</label>
          <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@gmail.com"/>
          </div>
          <div><label>Password:</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </div>
          <Button variant={"accent"} onClick={handleLogin}  className="button hidden md:flex" type="onSubmit">Login</Button>
          <p>Don't have an account? <button onClick={() => navigate("/signup")} className="button">Sign Up</button></p>
        </div>
        {/*button out the block on mobile*/}
        <Button
          variant={"accent"}
          onClick={handleLogin}
          className="button sm:flex md:hidden mt-20 w-full max-w-[330px]"
          type="onSubmit">
            Login
        </Button>
      </div>
    </>
  );
};

export default Login;
