import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signInValidationSchema } from "../utils/yupValidations";

function SignInForm({ setActiveForm, setIsOpen, notify }: any) {
  const [locked, setLocked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInValidationSchema),
  });

  const formSubmitHandler = async (data: any) => {
    setLocked(true);
    const gqlQuery = {
      query: `mutation {
      signInUser(userInput: {email:"${data.email}" password:"${data.password}" name:"${data.name}"}) {_id name email},
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
      window.localStorage.setItem("_id", resData.data.signInUser._id!);
      window.localStorage.setItem("email", resData.data.signInUser.email!);
      window.localStorage.setItem("name", resData.data.signInUser.name!);
      setIsOpen(false);
      setActiveForm(1);
      notify("Successfully Signed In", 1);
    } else {
      notify(resData.errors[0].message.split(": ")[1], 2);
      setLocked(false);
    }
  };

  return (
    <div className="min-w-[300px]">
      <h2 className="text-4xl tracking-wider text-center">SIGN IN</h2>
      <form
        className="flex flex-col justify-center items-center mt-5 space-y-3"
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
          {...register("name")}
          type="text"
          placeholder="Name"
          className="bg-slate-800 w-full px-5 py-2 rounded-sm hover:bg-slate-900 focus:bg-slate-900 duration-500 ease-in-out outline-none"
        />
        {errors.name && (
          <span className="text-red-500 mt-1 text-center">
            {errors.name.message?.toString()}
          </span>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="bg-slate-800 w-full px-5 py-2 rounded-sm hover:bg-slate-900 focus:bg-slate-900 duration-500 ease-in-out outline-none"
        />
        {errors.password && (
          <span className="text-red-500 mt-1 text-center">
            {errors.password.message?.toString()}
          </span>
        )}

        <button
          disabled={locked}
          type="submit"
          className="px-6 py-2 mt-5 bg-slate-800 rounded-full tracking-wider hover:text-lime-500 duration-500 ease-in-out hover:bg-slate-900 cursor-pointer"
        >
          {locked ? (
            <div className="w-5 h-5 mx-2 border-2 border-t border-t-white border-lime-500 animate-spin rounded-full" />
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>
      <p className="text-center mt-5">
        Already have an account??{" "}
        <span
          className="text-lime-500 cursor-pointer hover:drop-shadow-lg hover:text-shadow-lime"
          onClick={() => setActiveForm(1)}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default SignInForm;
