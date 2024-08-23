import { FUGAZ_FONT } from "@/constants";
import { Button } from "./Button";

export const Login = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3
        className={`text-4xl sm:text-5xl md:text-6xl ${FUGAZ_FONT.className}`}
      >
        Log In / Register
      </h3>
      <p>{"You're one step away!"}</p>
      <input
        className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none focus:border-indigo-600 hover:border-indigo-600"
        type="text"
        placeholder="Email"
      />
      <input
        className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none focus:border-indigo-600 hover:border-indigo-600"
        type="password"
        placeholder="Password"
      />
      <div className="w-full max-w-[400px] mx-auto">
        <Button full>Submit</Button>
      </div>
      <p className="text-center">
        {"Don't have an account? "}
        <span className="text-indigo-600">Sign up</span>
      </p>
    </div>
  );
};
