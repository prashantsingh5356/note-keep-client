import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../slices/userAuthSlice.js";
import BASE_URL from "../serverInfo.js";
import NavBar from "../components/NavBar.jsx"

const LoginScreen = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const loginUserHandler = async (e) => {
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const request = await fetch(`${BASE_URL}/api/users/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (response.message === "success") {
      const token = response?.token;
      const userID = response?.data?.id;
      localStorage.setItem("auth", token);
      localStorage.setItem("_id", userID);
      dispatch(setToken(token));
      navigate("/");
    }

    console.log("<<<<<<<< response >>>>>>>>>", response);
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-lg rounded-lg px-8 py-6">
            <h2 className="text-3xl font-bold mb-6 text-black">Login</h2>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                ref={emailRef}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                ref={passwordRef}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={loginUserHandler}
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-black hover:text-gray-700"
                href="/"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
