import React, { useState } from "react";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data.email, data.password);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-white dark:bg-neutral-800 rounded-xl p-10 shadow-md border  border-black/10">
        
        <h2 className="text-center text-2xl font-bold leading-tight dark:text-white">
          Sign in your account
        </h2>
        
        {error && <p className="text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8  dark:text-white ">
          <div className="space-y-5">
            <Input
            className="rounded-md border-2 border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2"
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                    "Invalid email format",
                },
              })}
            />

            <Input
            className="rounded-md border-2 border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 "
              label="Password"
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: "enter your password",
              })}
            />

            <Button type="submit" className="w-full rounded-md bg-cyan-400   transition-colors font-semibold  shadow-md">
              Sign in
            </Button>
          </div>
        </form>
        <p className="mt-2 text-center text-base text-gray-700 dark:text-gray-300">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
