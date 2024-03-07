import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authservice from "../Backend/AuthService";
import { login } from "../Store/AuthSlice";
import { Button, Container, InputBox } from "./index";

function SignupForm() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submit = async (data) => {
    setError("");
    const allowedDomains = [
      "gmail.com",
      "hotmail.com",
      "yahoo.com",
      "Outlook.com",
    ];
    const emaildomain = data.email.split("@")[1];
    const verifyEmailDomain = allowedDomains.includes(emaildomain);
    if (verifyEmailDomain) {
      try {
        const userData = await authservice.SignIn({ ...data });
        if (userData) {
          const userData = await authservice.CurrentUser();
          dispatch(login(userData));
          navigate("/");
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError(
      ` Please Enter the vaild email domain!
      "gmail.com",
      "hotmail.com",
      "yahoo.com",
      "Outlook.com"
        `
      );
    }
  };
  return (
    <Container
      classname=" h-[80vh]  flex justify-center items-center bg-no-repeat bg-center bg-cover  "
      style={{ backgroundImage: "url(src/assests/sign-in-bg.jpg)" }}
    >
      <div className=" bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-400 h-[90%] w-[40%] rounded-xl flex flex-col gap-2 items-center py-5">
        <p className="font-medium">
          Sign up for{" "}
          <span className="text-white font-semibold">Buddy Blog</span>{" "}
        </p>
        <div className="flex items-center">
          <p className="font-medium">Already have an account?&nbsp;</p>
          <Link
            to={"/login"}
            className="text-red-700 text-sm hover:font-semibold hover:underline hover:decoration-red-600 hover:decoration-1 hover:underline-offset-4 transition-all ease-linear"
          >
            <p>Login</p>
          </Link>
        </div>

        {error && (
          <p className="mx-3 p-1 px-2 border border-red-400 rounded-xl font-semibold text-white text-sm bg-red-600 shadow-l shadow-red-500">
            {error}
          </p>
        )}
        <form
          onSubmit={handleSubmit(submit)}
          className=" h-[70%] w-[90%] flex flex-col justify-around items-start"
        >
          <div className="flex flex-col h-[70%] justify-evenly w-full">
            <InputBox
              label="Name: "
              type="text"
              labelclass="text-white"
              placeholder="Enter your fullname"
              className={` rounded-md px-2 py-2 focus:outline-none text-sm w-full text-white bg-gray-700 focus:bg-green-700/80 focus:border-green-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-400 active:bg-green-700/80 ${
                error
                  ? "bg-red-700/80 border-red-500  focus:bg-red-700/80 focus:border-red-500"
                  : null
              }`}
              {...register("name", {
                required: true,
              })}
            />
            <InputBox
              label="Email: "
              type="email"
              labelclass="text-white"
              placeholder="Enter your Email"
              className={` rounded-md px-2 py-2 focus:outline-none text-sm w-full text-white bg-gray-700 focus:bg-green-700/80 focus:border-green-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-400 ${
                error
                  ? "bg-red-700/80 border-red-500  focus:bg-red-700/80 focus:border-red-500"
                  : null
              }`}
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => {
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                      value
                    ) || "Please Enter the vaild Email";
                  },
                },
              })}
            />
            <InputBox
              label="Password: "
              type="password"
              labelclass="text-white"
              placeholder="Enter your password"
              className={` rounded-md px-2 py-2 focus:outline-none text-sm w-full text-white bg-gray-700 focus:bg-green-700/80 focus:border-green-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-400 ${
                error
                  ? "bg-red-700/80 border-red-500  focus:bg-red-700/80 focus:border-red-500"
                  : null
              }`}
              {...register("password", {
                required: true,
              })}
            />
          </div>

          <Button
            type="submit"
            className="p-[6px] px-6 bg-blue-500 rounded-2xl text-sm text-white font-medium active:bg-blue-800"
          >
            Sign in
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SignupForm;
