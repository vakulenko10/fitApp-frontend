import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { AuthData } from "@/hooks/AuthData";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, googleAuth, setUser, setToken } = AuthData();
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
      const { user, token, profileImageURL } = await googleAuth();
      console.log("token in Login:", token);
      setUser({ ...user, profileImageURL, isAuthenticated: true });
      setToken(token);
      // document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict; Secure`;
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1); // Cookie expires in 1 day
      document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/;`;

      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, isAuthenticated: true }),
      );
      navigate("/profile"); // redirect wherever you need
    } catch (err) {
      console.error("Google auth failed:", err);
    }
  };

  return (
    <div className="container m-0 mx-auto flex justify-center p-0 md:p-8 h-svh">
        <div className="bg-primary">
          <h1 className="">Login</h1>
          <div>
            <label>Email:</label>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@gmail.com"
            />
          </div>
          <div>
            <label>Password:</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 py-2">
            <Button
              variant={"accent"}
              onClick={handleLogin}
              className="w-full max-w-[330px]"
              type="onSubmit"
            >
              Login
            </Button>
            <Button
              variant={"accent"}
              onClick={handleGoogleLogin}
              className="w-full max-w-[330px]"
            >
              Login with google
            </Button>
          </div>

          <p>
            Don't have an account?{" "}
            <button onClick={() => navigate("/signup")} className="button">
              Sign Up
            </button>
          </p>
        </div>
        {/*button out the block on mobile*/}
    </div>
  );
};

export default Login;
