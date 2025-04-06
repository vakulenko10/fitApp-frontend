import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/validation/registration";
import { useNavigate } from "react-router-dom";
import { AuthData } from "@/hooks/AuthData";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useNotification } from "@/hooks/UseNotification";

const Signup = () => {
  const { signup } = AuthData();
  const navigate = useNavigate();
  const { triggerToast } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      await signup(data.name, data.email, data.password);
      navigate("/profile");
    } catch (error) {
      triggerToast(error.message, "error");
    }
  };

  return (
    <Container className="m-0 mx-auto flex h-[calc(100svh-80px)] items-center justify-center p-0 md:p-8">
      <div className="bg-primary w-full rounded-md p-10 md:w-1/2 lg:w-1/3">
        <h1 className="mb-10 p-0 text-center text-xl">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium">
              Name:
            </label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              className="mt-2 w-full py-8"
            />
            {errors.name && <p className="text-sm text-accent-negative">{errors.name.message}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <Input
              id="email"
              type="text"
              {...register("email")}
              placeholder="name@gmail.com"
              className="mt-2 w-full py-8"
            />
            {errors.email && <p className="text-sm text-accent-negative">{errors.email.message}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Password"
              className="mt-2 w-full py-8"
            />
            {errors.password && <p className="text-sm text-accent-negative">{errors.password.message}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password:
            </label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm your password"
              className="mt-2 w-full py-8"
            />
            {errors.confirmPassword && <p className="text-sm text-accent-negative">{errors.confirmPassword.message}</p>}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <Button className="w-full rounded-md p-8" type="submit" variant={"submit"}>
              Sign Up
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center">
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
