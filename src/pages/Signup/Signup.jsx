import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "@/hooks/AuthData";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup } = AuthData();
  const handleSignup = async () => {
    try {
      await signup(name, email, password);
      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container className="m-0 mx-auto flex h-[calc(100svh-80px)] items-center justify-center p-0 md:p-8">
      <div className="bg-primary mx-4 w-full rounded-md p-10 md:w-1/2 lg:w-1/3">
        <h1 className="md:mb-10 mb-5 p-0 text-center text-2xl font-medium">Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium">
              Name:
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-2 w-full md:py-8"
            />
          </div>

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
              className="mt-2 w-full md:py-8"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-2 w-full md:py-8"
            />
          </div>

          <div className="md:mt-10 mt-5 flex flex-col items-center justify-center gap-4">
            <Button
              className="w-full rounded-md p-6 md:p-8"
              type="submit"
              variant={"submit"}
            >
              Sign Up
            </Button>
          </div>
        </form>

        <p className="md:mt-10 mt-5 text-center">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="underline">
            Log In
          </button>
        </p>
      </div>
    </Container>
  );
};

export default Signup;
