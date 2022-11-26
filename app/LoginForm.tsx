import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginValidationSchema } from "../utils/yupValidations";

function LoginForm({ setActiveForm, setIsOpen, notify }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const formSubmitHandler = async (data: any) => {
    const gqlQuery = {
      query: `{
        loginUser(userInput: {email:"${data.email}" password:"${data.password}"}) {_id name email},
       }`,
    };
    const res = await fetch("https://bookinn-node.onrender.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gqlQuery),
    });
    const resData = await res.json();
    if (!resData.errors) {
      window.localStorage.setItem("_id", resData.data.loginUser._id!);
      window.localStorage.setItem("email", resData.data.loginUser.email!);
      window.localStorage.setItem("name", resData.data.loginUser.name!);
      setIsOpen(false);
      notify("Login Successful", 1);
    } else {
      notify(resData.errors[0].message.split(": ")[1], 2);
    }
  };

  return (
    <div className="max-w-[550px] w-full">
      <h2 className="text-4xl tracking-wider text-center">LOGIN</h2>
      <form
        className="flex flex-col justify-center items-center mt-5"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="bg-slate-800 w-full px-5 py-2 rounded-sm hover:bg-slate-900 focus:bg-slate-900 duration-500 ease-in-out outline-none"
        />
        {errors.email && (
          <span className="text-red-500 mt-1 text-center">
            {errors.email.message?.toString()}
          </span>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="bg-slate-800 w-full mt-5 px-5 py-2 rounded-sm hover:bg-slate-900 focus:bg-slate-900 duration-500 ease-in-out outline-none"
        />
        {errors.password && (
          <span className="text-red-500 mt-1 text-center">
            {errors.password.message?.toString()}
          </span>
        )}

        <button
          type="submit"
          className="px-6 py-2 mt-5 bg-slate-800 rounded-full tracking-wider hover:text-lime-500 duration-500 ease-in-out hover:bg-slate-900 cursor-pointer"
        >
          login
        </button>
      </form>
      <p className="text-center mt-5">
        Don't have an account??{" "}
        <span
          className="text-lime-500 cursor-pointer hover:drop-shadow-lg hover:text-shadow-lime"
          onClick={() => setActiveForm(2)}
        >
          Sign In
        </span>
      </p>
    </div>
  );
}

export default LoginForm;
