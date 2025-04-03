import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "@/hooks/AuthData";

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
    <div className="flex min-h-screen flex-col items-center justify-center">
      {/* Заголовок над блоком (мобильная версия) */}
      <h1 className="bg-background h-[100px] w-full max-w-[330px] rounded-sm text-center md:max-w-[600px] lg:hidden">
        Sign Up
      </h1>

      <div className="bg-primary w-full max-w-[330px] rounded-lg p-10 px-[15px] pt-[65px] pb-[70px] md:max-w-[600px] md:px-[50px] md:pt-[85px] md:pb-[70px] lg:max-w-[510px] lg:px-16 lg:pt-10 lg:pb-20">
        {/* Заголовок внутри блока (только на десктопе) */}
        <h1 className="mb-6 flex hidden h-[100px] w-full items-center justify-center rounded-sm text-center md:mb-8 lg:mb-[100px] lg:flex">
          Sign Up
        </h1>

        <div>
          <label>Name:</label>
          <Input
            className="bg-muted mt-4 p-6"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label>Email:</label>
          <Input
            className="bg-muted mt-4 p-6"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@gmail.com"
          />
        </div>

        <div style={{ marginTop: "15px" }}>
          <label style={{ marginRight: "8px" }}>Password:</label>
          <Input
            className="bg-muted mt-4 p-6"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        {/* Кнопка для регистрации */}
        <Button
          variant={"submit"}
          onClick={handleSignup} // Исправлено
          className="button mx-auto mt-8 hidden w-full max-w-[396px] items-center justify-center md:flex md:w-[396px]"
          type="submit"
        >
          Sign Up
        </Button>
      </div>

      {/* Кнопка для мобильных устройств */}
      <Button
        variant={"submit"}
        onClick={handleSignup} // Исправлено
        className="button mt-20 flex w-full max-w-[330px] md:hidden"
        type="submit"
      >
        Sign Up
      </Button>
    </div>
  );
};

export default Signup;
