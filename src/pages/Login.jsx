import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* Заголовок над блоком (мобильная версия) */}
      <h1 className="h-[100px] bg-background rounded-sm text-center w-full max-w-[330px] md:max-w-[600px] lg:hidden">
        Login
      </h1>

      <div className="bg-primary p-10 rounded-lg w-full max-w-[330px] md:max-w-[600px] lg:max-w-[510px] md:pt-[85px] md:pb-[70px] md:px-[50px]  
      lg:pt-10 lg:pb-6 lg:px-16 px-[15px] pt-[65px] pb-[70px]">
        {/* Заголовок внутри блока (только на десктопе) */}
        <h1 className="h-[100px] rounded-sm text-center flex justify-center items-center w-full hidden lg:flex mb-6 md:mb-8 lg:mb-[100px]">
          Login
        </h1>

        <div>
          <label>Email:</label>
          <Input className="bg-muted p-6 mt-4" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@gmail.com"/>
        </div>
        <div style={{ marginTop: "15px" }}>
          <label style={{ marginRight: "8px" }}>Password:</label>
          <Input className="bg-muted p-6 mt-4" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
        </div>

        {/* Кнопка внутри блока (только на десктопе) */}
        <Button
          variant={"submit"}
                  onClick={handleLogin}
          className="button hidden md:flex justify-center items-center w-full md:w-[396px] max-w-[396px] mt-8 mx-auto"
          type="submit"
        >
          Login
        </Button>

        <p className="text-center flex justify-center items-center mt-10">
          Don't have an account?  
          <button onClick={() => navigate("/signup")} className="button text-secondary"> Sign Up</button>
        </p>
      </div>

      {/*mobile button*/}
      <Button
        variant={"submit"}
        onClick={handleLogin}
        className="button flex md:hidden mt-20 w-full max-w-[330px]"
        type="submit"
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
