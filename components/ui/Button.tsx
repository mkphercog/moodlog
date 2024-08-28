import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

export const BUTTON_VARIANTS: Record<Variants, string> = {
  light: "text-green-600",
  dark: `
          text-white bg-green-600 
          hover:!bg-green-500 hover:!border-green-500 
          disabled:!bg-slate-600 disabled:!border-slate-600 disabled:text-white
        `,
  outline:
    "border-transparent hover:!bg-green-50 hover:border-transparent text-green-600 disabled:!bg-slate-100",
  destructive:
    "text-white bg-red-500 border-red-500 hover:bg-red-400 hover:border-red-400",
};

export const BASIC_BUTTON_CLASS_NAMES = `
py-2 sm:py-3 px-4 sm:px-5 
whitespace-nowrap rounded-xl overflow-hidden
duration-300 font-semibold outline-none 
border-2 border-solid border-green-600 
hover:bg-green-100 hover:border-green-500  
disabled:border-slate-600 disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed
`;

type Variants = "dark" | "light" | "outline" | "destructive";

type ButtonProps = {
  variant?: Variants;
  full?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { variant = "light", children, full, className, ...restProps } = props;
  const fullClassNames = full ? "grid place-items-center w-full" : "";

  return (
    <button
      className={`
        ${BASIC_BUTTON_CLASS_NAMES} 
        ${BUTTON_VARIANTS[variant]} 
        ${fullClassNames} 
        ${className}
        `}
      {...restProps}
    >
      {children}
    </button>
  );
};
