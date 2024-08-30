"use client";

import { COLORS } from "@/constants";
import { useUiColors } from "@/context/ColorsContext";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

export const BASIC_BUTTON_CLASS_NAMES = `
py-2 sm:py-3 px-4 sm:px-5 
whitespace-nowrap rounded-xl overflow-hidden
duration-300 font-semibold outline-none 
border border-solid
disabled:border-slate-600 disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed
`;

export const getButtonColors = (colorName: string, variant: Variants) => {
  const colorStyles: Record<Variants, {}> = {
    light: {
      "--text-color": COLORS[colorName][6],
      "--text-hover-color": COLORS[colorName][6],
      "--bg-color": "white",
      "--bg-hover-color": COLORS[colorName][1],
      "--border-color": COLORS[colorName][6],
      "--border-hover-color": COLORS[colorName][6],
    },
    dark: {
      "--text-color": "white",
      "--text-hover-color": "white",
      "--bg-color": COLORS[colorName][6],
      "--bg-hover-color": COLORS[colorName][5],
      "--border-color": COLORS[colorName][6],
      "--border-hover-color": COLORS[colorName][5],
    },
    outline: {
      "--text-color": COLORS[colorName][6],
      "--text-hover-color": COLORS[colorName][6],
      "--bg-color": "transparent",
      "--bg-hover-color": COLORS[colorName][0],
      "--border-color": "transparent",
      "--border-hover-color": "transparent",
    },
    destructive: {},
  };
  return colorStyles[variant];
};

const destructiveVariant =
  "text-white bg-red-500 border-red-500 hover:bg-red-400 hover:border-red-400";

type Variants = "dark" | "light" | "outline" | "destructive";

type ButtonProps = {
  variant?: Variants;
  full?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { variant = "light", children, full, className, ...restProps } = props;
  const fullClassNames = full ? "grid place-items-center w-full" : "";
  const { currentColorName } = useUiColors();

  return (
    <button
      style={getButtonColors(currentColorName, variant)}
      className={`
        ${BASIC_BUTTON_CLASS_NAMES} 
        ${fullClassNames} 
        ${className}
        ${variant === "destructive" ? destructiveVariant : "elementColors"}
        `}
      {...restProps}
    >
      {children}
    </button>
  );
};
