"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp({ params }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [notComplated, setNotComplated] = useState(false);
  const [notMatch, setNotMatch] = useState(false);

  let navigate = useRouter();

  function signUpHandler() {
    if (name && email && password && confirmPassword) {
      setNotComplated(false);
      if (password == confirmPassword) {
        setNotMatch(false);
        //

        //
      } else {
        setNotMatch(true);
      }
    } else {
      setNotComplated(true);
    }
  }

  if (params == "login") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-6 mt-4">
        <input
          type="email"
          placeholder="email..."
          className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
        />
        <input
          type="password"
          placeholder="password..."
          className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
        />
        <div className="flex items-center gap-5 flex-col">
          <button className="btn btn-yellow">login</button>
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate.push("?model=sign-up");
            }}
          >
            sign up
          </span>
        </div>
        {notComplated && (
          <p className="text-red-500">please complete all inputs</p>
        )}
        {notMatch && (
          <p className="text-red-500">
            please matching password and confirm password
          </p>
        )}
      </div>
    );
  } else if (params == "sign-up" || !params) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-6 mt-4">
        <input
          type="text"
          placeholder="name..."
          className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
          onChange={(e) => {
            setName(e.target.value);
          }}
          name="name"
        />
        <input
          type="email"
          placeholder="email..."
          className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
        />
        <input
          type="password"
          placeholder="password..."
          className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
        />
        <input
          type="password"
          placeholder="confirm password..."
          className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          name="password"
        />
        <div className="flex items-center gap-5 flex-col">
          <button
            className="btn btn-yellow"
            onClick={() => {
              signUpHandler();
            }}
          >
            sign up
          </button>
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate.push("?model=login");
            }}
          >
            login
          </span>
        </div>
        {notComplated && (
          <p className="text-red-500">please complete all inputs</p>
        )}
        {notMatch && (
          <p className="text-red-500">
            please matching password and confirm password
          </p>
        )}
      </div>
    );
  }
}
