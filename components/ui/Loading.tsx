import { FC } from "react";

type LoadingSizes = "sm" | "md" | "lg";

type LoadingProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZES: Record<LoadingSizes, string> = {
  sm: "text-xl sm:text-2xl",
  md: "text-4xl sm:text-5xl",
  lg: "text-5xl sm:text-7xl",
};

export const Loading: FC<LoadingProps> = ({ size = "md", className }) => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <i
        className={`
          fa-solid fa-spinner animate-spin text-slate-800
          ${SIZES[size]}
          ${className}
        `}
        aria-hidden
      />
    </div>
  );
};
