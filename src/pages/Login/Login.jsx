import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { AuthData } from "@/hooks/AuthData";
import Container from "@/components/Container";

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
    <Container className="m-0 mx-auto flex h-[calc(100svh-80px)] items-center justify-center p-0 md:p-8">
      <div className="bg-primary rounded-md p-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className="mb-10 text-center text-xl p-0">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@gmail.com"
              className="mt-2 py-8 w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-2 py-8 w-full"
            />
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <Button className="p-8 w-full rounded-md" type="submit" variant={"submit"}>
              Login
            </Button>
            <Button onClick={handleGoogleLogin} className="p-8 w-full rounded-md" >
              Login with Google
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </Container>
  );
};

export default Login;
