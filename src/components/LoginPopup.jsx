import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    console.log("Data sent:", data); // Debugging log

    let newUrl = `${url}/api/v1/users/${
      currState === "Login" ? "signin" : "signup"
    }`;

    try {
      const response = await axios.post(newUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 201 || response.status === 200) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        setShowLogin(false);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.message : error.message
      );
      alert(
        error.response ? error.response.data.message : "Something went wrong"
      );
    }
  };

  return (
    <div className="fixed inset-0 grid  items-center justify-center  bg-opacity-20">
      <form onSubmit={onLogin} className="p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
            className="cursor-pointer w-5 h-5"
          />
        </div>
        <div className="space-y-2">
          {currState === "Sign up" && (
            <>
              {" "}
              <input
                name="firstName"
                onChange={onChangeHandler}
                value={data.firstName}
                type="text"
                placeholder="First Name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="lastName"
                onChange={onChangeHandler}
                value={data.lastName}
                type="text"
                placeholder="Last Name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
            className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="confirmPassword"
            onChange={onChangeHandler}
            value={data.confirmPassword}
            type="password"
            placeholder="confirm Password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white py-2  rounded-lg hover:bg-blue-600 transition-colors"
        >
          {currState === "Sign up" ? "Create account" : "Login"}
        </button>
        <div className="mt-4 flex items-start">
          <input
            type="checkbox"
            required
            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
          />
          <p className="text-sm">
            By continuing, i agree to the terms of use & privacy policy.
          </p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setCurrState("Sign up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setCurrState("Login")}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
