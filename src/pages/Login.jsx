
import React from "react"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { AuthData } from "@/components/auth/AuthWrapper.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login, googleAuth, setUser, setToken} = AuthData();
  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const { user, token } = await googleAuth();
      console.log('token in Login:', token)
      setUser({ ...user, isAuthenticated: true });
      setToken(token);
      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict; Secure`;
      localStorage.setItem("user", JSON.stringify({ ...user, isAuthenticated: true }));
      navigate('/profile'); // redirect wherever you need
    } catch (err) {
      console.error("Google auth failed:", err);
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
          <div className="flex flex-col py-2 justify-center items-center gap-2">
          <Button variant={"accent"} onClick={handleLogin}  className="w-full max-w-[330px]" type="onSubmit">Login</Button>
          <Button
          variant={"accent"}
          onClick={handleGoogleLogin}
          className="w-full max-w-[330px]">
            Login with google
        </Button>
          </div>
          
          <p>Don't have an account? <button onClick={() => navigate("/signup")} className="button">Sign Up</button></p>
        </div>
        {/*button out the block on mobile*/}
        
        
      </div>
      
    </>
  );
};

export default Login;
