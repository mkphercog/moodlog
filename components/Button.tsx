import { FUGAZ_FONT } from "@/constants";
import { FC, PropsWithChildren } from "react";

type ButtonProps = {
  variant?: "dark" | "light" | "outline";
  full?: boolean;
  className?: string;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  variant,
  children,
  full,
  className,
}) => {
  const basicClassNames =
    "px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 rounded-full overflow-hidden duration-200 border-2 border-solid border-indigo-600 hover:scale-[1.025]";
  let variantClassNames = "text-indigo-600";
  const fullClassNames = full ? "grid place-items-center w-full" : "";

  switch (variant) {
    case "dark":
      variantClassNames = "text-white bg-indigo-600";
      break;

    case "outline":
      variantClassNames = "border-none text-indigo-600";
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
        ${FUGAZ_FONT.className}
        ${className}
        `}
    >
      {children}
    </button>
  );
};
