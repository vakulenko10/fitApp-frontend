import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/registration";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { AuthData } from "@/hooks/AuthData";
import Container from "@/components/Container";
import { useNotification } from "@/hooks/useNotification";
const Login = () => {
  const { login, googleAuth, setUser, setToken } = AuthData();
  const navigate = useNavigate();
  const { triggerToast } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/profile");
    } catch (error) {
      triggerToast(error.message, "error");
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user, token, profileImageURL } = await googleAuth();
      setUser({ ...user, profileImageURL, isAuthenticated: true });
      setToken(token);
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);
      document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/;`;
      localStorage.setItem("user", JSON.stringify({ ...user, isAuthenticated: true }));
      navigate("/profile");
    } catch (err) {
      console.error("Google auth failed:", err);
    }
  };

  return (
    <Container className="m-0 mx-auto flex h-[calc(100svh-80px)] items-center justify-center p-0 md:p-8">
      <div className="bg-primary rounded-md p-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className="mb-10 text-center text-xl p-0">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium">Email:</label>
            <Input {...register("email")} placeholder="name@gmail.com" className="mt-2 py-8 w-full" />
            {errors.email && <p className="text-accent-negative text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password:</label>
            <Input {...register("password")} type="password" placeholder="Password" className="mt-2 py-8 w-full" />
            {errors.password && <p className="text-accent-negative text-sm mt-1 animate-fade-in">{errors.password.message}</p>}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <Button className="p-8 w-full rounded-md" type="submit"  variant={"submit"}>Login</Button>
            <Button onClick={handleGoogleLogin} className="p-8 w-full rounded-md">Login with Google</Button>
          </div>
        </form>

        <p className="mt-10 text-center">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="underline">Sign Up</button>
        </p>
      </div>
    </Container>
  );
};

export default Login;
