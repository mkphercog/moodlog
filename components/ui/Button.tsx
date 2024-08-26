import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

type ButtonProps = {
  variant?: "dark" | "light" | "outline";
  full?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { variant, children, full, className, ...restProps } = props;
  const basicClassNames = `
    py-2 sm:py-3
    px-4 sm:px-5 
    whitespace-nowrap rounded-xl overflow-hidden duration-300 font-semibold 
    border-2 border-solid border-green-600 
    hover:bg-green-100 hover:border-green-500  
    disabled:border-slate-600 disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed
    `;
  let variantClassNames = "text-green-600";
  const fullClassNames = full ? "grid place-items-center w-full" : "";

  switch (variant) {
    case "dark":
      variantClassNames = `
        text-white bg-green-600 
        hover:!bg-green-500 hover:!border-green-500 
        disabled:!bg-slate-600 disabled:!border-slate-600 disabled:text-white
        `;
      break;

    case "outline":
      variantClassNames =
        "border-none hover:!bg-green-50 text-green-600 disabled:!bg-slate-100";
      break;

    default:
      break;
  }

  return (
    <button
      className={`
        ${basicClassNames} 
        ${variantClassNames} 
        ${fullClassNames} 
        ${className}
        `}
      {...restProps}
    >
      {children}
    </button>
  );
};
