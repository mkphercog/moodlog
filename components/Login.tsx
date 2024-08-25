"use client";
import { FUGAZ_FONT } from "@/constants";
import { Button } from "./Button";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export const Login = () => {
  const { signUp, logIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || password.length < 6) {
      return;
    }

    setAuthenticating(true);
    try {
      if (isRegister) {
        console.log("REGISTER");
        await signUp(email, password);
      } else {
        console.log("LOGOWANIE");
        await logIn(email, password);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAuthenticating(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3
        className={`text-4xl sm:text-5xl md:text-6xl ${FUGAZ_FONT.className}`}
      >
        {isRegister ? "Register" : "Log In"}
      </h3>
      <p>{"You're one step away!"}</p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none focus:border-indigo-600 hover:border-indigo-600"
        type="text"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none focus:border-indigo-600 hover:border-indigo-600"
        type="password"
        placeholder="Password"
      />
      <div className="w-full max-w-[400px] mx-auto">
        <Button onClick={handleSubmit} disabled={authenticating} full>
          {authenticating ? "Submitting" : "Submit"}
        </Button>
      </div>
      <p className="text-center">
        {isRegister ? "Have an account?" : "Don't have an account?"}
        <Button
          className="text-indigo-600"
          variant="outline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Log In" : "Sign up"}
        </Button>
      </p>
    </div>
  );
};
