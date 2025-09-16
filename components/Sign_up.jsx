"use client";

import { supabase } from "@/app/supabase";
import jwt from "jsonwebtoken";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp({ params }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [notComplated, setNotComplated] = useState(false);
  const [notMatch, setNotMatch] = useState(false);
  const [repeatEmail, setRepeatEmail] = useState(false);
  const [isShortPassword, setIsShortPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passowrdError, setPassowrdError] = useState(false);
  const [apiError, setApiError] = useState(false);

  const [isClicked, setIsClicked] = useState(false);

  let navigate = useRouter();

  async function signUpHandler() {
    setIsClicked(true);

    if (!name || !email || !password || !confirmPassword) {
      setNotComplated(true);
      return;
    }
    setNotComplated(false);

    if (password !== confirmPassword) {
      setNotMatch(true);
      return;
    }
    setNotMatch(false);

    if (password.length < 5) {
      setIsShortPassword(true);
      return;
    }
    setIsShortPassword(false);

    // گرفتن همه‌ی کاربرها
    let { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.error(error);
      return;
    }

    // ایمیل تکراری؟
    if (data.some((user) => user.email === email)) {
      setRepeatEmail(true);
      return;
    }
    setRepeatEmail(false);

    // یوزرنیم یکتا
    let finalUserName = userName;
    while (data.some((user) => user.userName === finalUserName)) {
      finalUserName = `${name}_${Math.floor(Math.random() * 1000)}`;
    }
    setUserName(finalUserName);

    // ذخیره در دیتابیس
    let { error: insertError } = await supabase.from("users").insert([
      {
        name,
        userId: `${Date.now()}${Math.floor(Math.random() * 100000)}`,
        userName: finalUserName,
        email,
        password,
        date: Date.now(),
      },
    ]);

    if (insertError) {
      console.error(insertError);
    } else {
      navigate.push("/");
    }
  }
  async function loginHandler() {
    const { data, error } = await supabase.from("users").select("*");

    const thisUser = data.filter((user) => {
      return user.email == email;
    });

    if (!email || !password) {
      setNotComplated(true);
      return;
    }
    setNotComplated(false);

    if (thisUser.length != 1) {
      setEmailError(true);
      return;
    }
    setEmailError(false);

    if (password != thisUser[0].password) {
      setPassowrdError(true);
      return;
    }
    setPassowrdError(false);

    let res = await fetch("/api/set-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: thisUser[0].userId }),
    });

    let status = await res.json();

    if (status.status == 200) {
      navigate.push("/");
      setApiError(false);
    } else {
      setApiError(true);
    }
  }
  if (params == "login") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-6 mt-4">
        <input
          type="email"
          placeholder="email..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
        />
        <input
          type="password"
          placeholder="password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
          className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
        />
        <div className="flex items-center gap-5 flex-col">
          <button
            className="btn btn-yellow"
            onClick={() => {
              loginHandler();
            }}
          >
            login
          </button>
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
        {repeatEmail && (
          <p className="text-red-400">please select another email</p>
        )}
        {isShortPassword && <p className="text-red-400">password is short</p>}
        {emailError && <p className="text-red-400">email is not found</p>}
        {passowrdError && <p className="text-red-400">password is wrong</p>}
        {apiError && <p className="text-red-400">please try again</p>}
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
            setUserName(
              `${e.target.value}_${Math.floor(Math.random() * 1000)}`
            );
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
              if (isClicked) {
              } else {
                signUpHandler();
              }
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
        {repeatEmail && (
          <p className="text-red-400">please select another email</p>
        )}
        {isShortPassword && <p className="text-red-400">password is short</p>}
      </div>
    );
  }
}
