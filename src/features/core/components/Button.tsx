import { ButtonHTMLAttributes } from "react";

export const Button = ({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={`hover:bg-gray-200 active:bg-gray-300 px-1 ${className || ""}`} {...props}>
      {children}
    </button>
  );
};

export const LightButton = ({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`px-2 bg-gray-200 hover:bg-gray-300 rounded-sm ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
