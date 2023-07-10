import React from "react";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../slices/userAuthSlice.js";
import BASE_URL from "../serverInfo.js";
import NavBar from "../components/NavBar.jsx";

const initialState = {
  userName: "test",
  email: "test@test.com",
  password: "test1234",
  confirmPassword: "test1234",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "userName":
      return { ...state, userName: action.payload };

    case "email":
      return { ...state, email: action.payload };

    case "password":
      return { ...state, password: action.payload };

    case "confirmPassword":
      return { ...state, confirmPassword: action.payload };
  }
};

const SignUpScreen = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [userData, userDispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  const signUpUserHandler = async (e) => {
    const request = await fetch(`${BASE_URL}/api/users/auth/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userData),
    });

    const response = await request.json();

    if (response.message === "success") {
      const token = response?.token;
      const userID = response?.data?.id;
      console.log(userID);
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
            <h2 className="text-3xl font-bold mb-6 text-black">Sign Up</h2>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                onChange={(e) => {
                  userDispatch({ type: "userName", payload: e.target.value });
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => {
                  userDispatch({ type: "email", payload: e.target.value });
                }}
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
                onChange={(e) => {
                  userDispatch({ type: "password", payload: e.target.value });
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="password"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="text"
                placeholder="Confirm your password"
                onChange={(e) => {
                  userDispatch({
                    type: "confirmPassword",
                    payload: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={signUpUserHandler}
              >
                Sign Up
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-black hover:text-gray-700"
                href="/login"
              >
                Already have an account? Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpScreen;
