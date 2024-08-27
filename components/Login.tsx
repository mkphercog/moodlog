"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { EMAIL_REGEX, ERROR_MESSAGES, SECONDARY_FONT } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { Button, Input, InputPassword, Loading } from "./ui";

export const Login = () => {
  const searchParams = useSearchParams();
  const { signUp, logIn, authError, setAuthError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticating, setAuthenticating] = useState(false);

  const isRegisterMode = searchParams.get("mode") === "register";

  useEffect(() => {
    setAuthError("none");
  }, [isRegisterMode, setAuthError]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setAuthError("empty");
      return;
    } else if (!EMAIL_REGEX.test(email)) {
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
      <p>You're one step away!</p>

      <form
        className="w-full max-w-[400px] flex flex-col justify-center items-center gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          value={email}
          name="Email"
          placeholder="Email"
          onChange={(e) => {
            if (authError) {
              setAuthError("none");
            }
            setEmail(e.target.value);
          }}
          isError={authError !== "none"}
        />
        <InputPassword
          value={password}
          onChange={(e) => {
            if (authError) {
              setAuthError("none");
            }
            setPassword(e.target.value);
          }}
          isError={authError !== "none"}
        />

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
            {authenticating ? (
              <div className="flex gap-2">
                <Loading className="text-white" size="sm" />
                Submitting
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>

      <p className="text-center">
        {isRegisterMode ? "Have an account? " : "Don't have an account? "}
        <Link href={`/dashboard?mode=${isRegisterMode ? "login" : "register"}`}>
          <Button className="text-green-600" variant="outline">
            {isRegisterMode ? "Log in" : "Sign up"}
          </Button>
        </Link>
      </p>
    </div>
  );
};
