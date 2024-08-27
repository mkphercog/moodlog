"use client";

import { FC, useRef, useState } from "react";
import { Input, InputProps } from "./Input";
import { Button } from "./Button";

export const InputPassword: FC<InputProps> = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full relative">
      <Input
        ref={passwordRef}
        name="Password"
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Password"
        {...props}
      />

      <Button
        type="button"
        variant="outline"
        className="absolute top-0 right-0 bottom-0 hover:!bg-transparent w-[45px] !p-0"
        onClick={() => {
          setIsPasswordVisible(!isPasswordVisible);

          setTimeout(() => {
            const currentValueLenght = passwordRef.current?.value.length;
            if (passwordRef.current && currentValueLenght) {
              passwordRef.current.setSelectionRange(
                currentValueLenght,
                currentValueLenght
              );
              passwordRef.current.focus();
            }
          }, 0);
        }}
      >
        {<p className="text-2xl">{isPasswordVisible ? "🙊" : "🙈"} </p>}
      </Button>
    </div>
  );
};
