import React, { useState } from "react";
import { Button, Container, InputBox } from "../index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../Store/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import authservice from "../../Backend/AuthService";

function Login() {
    const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleLogin = async (data) => {
    setError("");
    try {
      const userData = await authservice.Login({ ...data });
      if (userData) {
        const loggedUserData =await authservice.CurrentUser();
        dispatch(login(loggedUserData));
        navigate("/")
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container
      classname=" h-[80vh]  flex justify-center items-center bg-no-repeat bg-center bg-cover  "
      style={{ backgroundImage: "url(src/assests/login-bg.jpg)" }}
    >
      <form
        onSubmit={handleSubmit(handleLogin)}
        className=" bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-400 h-[90%] w-[40%] rounded-xl flex flex-col gap-2 items-center py-5"
      >
        <p className="font-medium">
          Login for
          <span className="text-white font-semibold"> Buddy Blog</span>{" "}
        </p>
        <div className="flex items-center">
          <p className="font-medium">Don't have Account? create know &nbsp;</p>
          <Link
            to={"/signup"}
            className="text-red-700 text-sm hover:font-semibold hover:underline hover:decoration-red-600 hover:decoration-1 hover:underline-offset-4 transition-all ease-linear"
          >
            <p>signup</p>
          </Link>
        </div>

        {error && (
          <p className="mx-3 p-1 px-2 border border-red-400 rounded-xl font-semibold text-white text-sm bg-red-600 shadow-l shadow-red-500">
            {error}
          </p>
        )}

        <div className="flex flex-col h-[60%]  justify-center items-start gap-5 w-full px-5 ">
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
          Log in
        </Button>
      </form>
    </Container>
  );
}

export default Login;
