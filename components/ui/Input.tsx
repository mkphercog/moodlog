"use client";

import { useUiColors } from "@/context/ColorsContext";
import {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from "react";

export type InputProps = {
  label?: string;
  isError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const InputWithRef: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref
) => {
  const { currentColors } = useUiColors();
  const { label, name, isError, className, ...restProps } = props;

  return (
    <div className="w-full">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        ref={ref}
        id={name}
        style={{
          "--border-color": currentColors[4],
          "--border-hover-color": currentColors[6],
        }}
        className={`
        w-full mx-auto px-3 py-3 
        rounded-xl outline-none duration-300
        border border-solid
        disabled:cursor-not-allowed disabled:border-slate-400
        ${
          isError
            ? "border-red-400 focus:border-red-600 hover:border-red-600"
            : "inputColors"
        }
        ${className}
       `}
        {...restProps}
      />
    </div>
  );
};

export const Input = forwardRef(InputWithRef);
