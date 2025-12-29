import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleSignup = async (data) => {
    setError("");
    try {
      const user = await authService.createAccount(data);
      if (user) {
        const userData = await authService.getCurrentUser();

        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full ">
      <div className="mx-auto w-full max-w-lg bg-white dark:bg-neutral-800 rounded-xl p-10 shadow-md border  border-black/10">
       

        <h2 className="text-center text-2xl font-bold leading-tight dark:text-white">
          Sign up to create account
        </h2>
        
        {error && <p className="text-red-600 text-center">{error}</p>}

        <form className="mt-8" onSubmit={handleSubmit(handleSignup)}>
          <div className="space-y-5 dark:text-white">
            <Input
            className="rounded-md border-2 border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 "
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

            <Input
            className="rounded-md border-2 border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 "
              label="Email :"
              type="email"
              placeholder="enter your email"
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
              label="Password: "
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full rounded-md bg-cyan-400   transition-colors font-semibold  shadow-md">
              Create Account
            </Button>
          </div>
        </form>
        <p className="mt-2 text-center text-base text-gray-700 dark:text-gray-300">
          Already have any account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
