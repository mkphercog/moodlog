"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ERROR_MESSAGES, SECONDARY_FONT } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/Button";

export const Login = () => {
  const searchParams = useSearchParams();
  const { signUp, logIn, authError, setAuthError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticating, setAuthenticating] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const isRegisterMode = searchParams.get("mode") === "register";

  useEffect(() => {
    setAuthError("none");
  }, [isRegisterMode, setAuthError]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setAuthError("empty");
      return;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setAuthError("email");
      return;
    } else if (password.length < 6) {
      setAuthError("password");
      return;
    }

    setAuthenticating(true);

    if (isRegisterMode) {
      await signUp(email, password);
    } else {
      await logIn(email, password);
    }

    setAuthenticating(false);
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3
        className={`text-4xl sm:text-5xl md:text-6xl !leading-[initial] ${SECONDARY_FONT.className}`}
      >
        {isRegisterMode ? "Register" : "Log In"}
      </h3>
      <p>{"You're one step away!"}</p>

      <form
        className="flex flex-col w-full justify-center items-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          value={email}
          onChange={(e) => {
            if (authError) {
              setAuthError("none");
            }
            setEmail(e.target.value);
          }}
          className="w-full max-w-[400px] mx-auto px-3 py-3 border border-solid border-green-400 rounded-xl outline-none duration-300 focus:border-green-600 hover:border-green-600"
          type="text"
          placeholder="Email"
        />
        <div className="w-full max-w-[400px] relative">
          <input
            ref={passwordRef}
            value={password}
            onChange={(e) => {
              if (authError) {
                setAuthError("none");
              }
              setPassword(e.target.value);
            }}
            className="w-full max-w-[400px] mx-auto px-3 pr-[45px] py-3  border border-solid border-green-400 rounded-xl outline-none duration-300 focus:border-green-600 hover:border-green-600"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
          />
          <Button
            type="button"
            variant="outline"
            className="absolute top-0 right-0 bottom-0 hover:!bg-transparent w-[45px] !p-0"
            onClick={() => {
              setIsPasswordVisible(!isPasswordVisible);
              setTimeout(() => {
                if (password.length && passwordRef.current) {
                  passwordRef.current.setSelectionRange(
                    password.length,
                    password.length
                  );
                  passwordRef.current.focus();
                }
              }, 0);
            }}
          >
            {<p className="text-2xl">{isPasswordVisible ? "🙊" : "🙈"} </p>}
          </Button>
        </div>
        {authError !== "none" && (
          <p className="text-xs sm:text-sm text-center max-w-[400px] text-red-600 font-bold">
            {ERROR_MESSAGES[authError]}
          </p>
        )}
        <div className="w-full max-w-[400px] mx-auto">
          <Button
            className={`text-lg sm:text-xl md:text-2xl ${SECONDARY_FONT.className}`}
            type="submit"
            variant="dark"
            disabled={authenticating}
            full
          >
            {authenticating ? "Submitting" : "Submit"}
          </Button>
        </div>
      </form>
      <p className="text-center">
        {isRegisterMode ? "Have an account? " : "Don't have an account? "}
        <Link href={`/dashboard?mode=${isRegisterMode ? "login" : "register"}`}>
          <Button className="text-green-600" variant="outline">
            {isRegisterMode ? "Log In" : "Sign up"}
          </Button>
        </Link>
      </p>
    </div>
  );
};
