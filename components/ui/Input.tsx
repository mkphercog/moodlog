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
  const { label, name, isError, ...restProps } = props;

  return (
    <div className="w-full">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        ref={ref}
        id={name}
        className={`
        w-full mx-auto px-3 py-3 
        rounded-xl outline-none duration-300
        border border-solid
        ${
          isError
            ? "border-red-400 focus:border-red-600 hover:border-red-600"
            : "border-green-400 focus:border-green-600 hover:border-green-600"
        }
        
       `}
        {...restProps}
      />
    </div>
  );
};

export const Input = forwardRef(InputWithRef);
