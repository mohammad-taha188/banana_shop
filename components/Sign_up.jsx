"use client";

import Loading from "@/app/loading";
import { supabase } from "@/app/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp({ params }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [notComplated, setNotComplated] = useState(false);
  const [notMatch, setNotMatch] = useState(false);
  const [repeatEmail, setRepeatEmail] = useState(false);
  const [isShortPassword, setIsShortPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailNotValid, setEmailNotValid] = useState(false);
  const [passowrdError, setPassowrdError] = useState(false);
  const [apiError, setApiError] = useState(false);

  const [isClicked, setIsClicked] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let navigate = useRouter();

  async function signUpHandler() {
    setIsClicked(true);
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setNotComplated(true);
      setIsLoading(false);
      setIsClicked(false);
      return;
    }
    setNotComplated(false);

    if (!emailRegex.test(e.target.value)) {
      setEmailNotValid(true);
      setIsLoading(false);
      setIsClicked(false);
      return;
    }
    setEmailNotValid(false);

    if (password !== confirmPassword) {
      setNotMatch(true);
      setIsLoading(false);
      setIsClicked(false);
      return;
    }
    setNotMatch(false);

    if (password.length < 5) {
      setIsShortPassword(true);
      setIsLoading(false);
      setIsClicked(false);
      return;
    }
    setIsShortPassword(false);
    if (!emailRegex.test(email)) {
      setEmailNotValid(true);
      setIsLoading(false);
      setIsClicked(false);
      return;
    }
    setEmailNotValid(false);

    // گرفتن همه‌ی کاربرها
    let { data, error } = await supabase.from("users").select("*");

    if (error) {
      setIsLoading(false);
      console.error(error);
      return;
    }

    // ایمیل تکراری؟
    if (data.some((user) => user.email == email)) {
      setIsLoading(false);
      setRepeatEmail(true);
      setIsClicked(false);
      return;
    }
    setRepeatEmail(false);

    // یوزرنیم یکتا
    let finalUserName = userName;
    while (data.some((user) => user.userName === finalUserName)) {
      finalUserName = `${name}_${Math.floor(Math.random() * 1000)}`;
    }
    setUserName(finalUserName);
    setIsClicked(false);
    let res = await fetch("/api/password", {
      method: "POST",
      body: JSON.stringify({ password: password }),
    });

    let isHashed = await res.json();

    if (isHashed.status == 200) {
      let userId = `${Date.now()}${Math.floor(Math.random() * 100000)}`;
      let { error: insertError } = await supabase.from("users").insert([
        {
          name,
          userId: userId,
          userName: finalUserName,
          email,
          password: isHashed.body,
          date: Date.now(),
        },
      ]);

      if (insertError) {
        console.error(insertError);
      } else {
        let res = await fetch("/api/set-cookie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        });
        let status = await res.json();

        if (status.status == 200) {
          navigate.push("/");
          setApiError(false);
        } else {
          setApiError(true);
          setIsLoading(false);
        }
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }

  async function loginHandler() {
    if (!emailLogin || !passwordLogin) {
      setNotComplated(true);
      setIsLoading(false);
      return;
    }
    setNotComplated(false);

    setIsLoading(true);

    const { data, error } = await supabase.from("users").select("*");

    if (!emailRegex.test(emailLogin)) {
      setEmailNotValid(true);
      setIsLoading(false);
      return;
    }
    setEmailNotValid(false);

    const thisUser = data.filter((user) => {
      return user.email == emailLogin;
    });

    if (thisUser.length != 1) {
      setEmailError(true);
      setIsLoading(false);
      return;
    }
    setEmailError(false);

    let check = await fetch("/api/check-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailLogin, passwordLogin }),
    });

    let passwordIsTrue = await check.json();

    if (passwordIsTrue.status != 200) {
      setPassowrdError(true);
      setIsLoading(false);
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
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  if (params == "login") {
    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-6 mt-4">
          <input
            key={"email-login"}
            type="email"
            defaultValue={emailLogin}
            placeholder="email..."
            onChange={(e) => {
              setEmailLogin(e.target.value);
            }}
            name="email"
            className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
          />
          <input
            key={"password-login"}
            type="password"
            placeholder="password..."
            onChange={(e) => {
              setPasswordLogin(e.target.value);
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
          {emailNotValid && <p className="text-red-400">email is not valid</p>}
          {passowrdError && <p className="text-red-400">password is wrong</p>}
          {apiError && <p className="text-red-400">please try again</p>}
        </div>
      );
    }
  } else if (params == "sign-up" || !params) {
    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-6 mt-4">
          <input
            type="text"
            key={"name"}
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
            key={"email"}
            defaultValue={email}
            placeholder="email..."
            className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
          />
          <input
            type="password"
            key={"password"}
            placeholder="password..."
            className="w-[70%] border border-gray-300 shadow shadow-gray-200 rounded-sm px-2 py-1 focus:outline focus:outline-gray-300"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
          />
          <input
            type="password"
            key={"confirm password"}
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
          )}{" "}
          {emailNotValid && <p className="text-red-400">email is not valid</p>}
          {isShortPassword && <p className="text-red-400">password is short</p>}
        </div>
      );
    }
  }
}
