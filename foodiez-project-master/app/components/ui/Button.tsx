import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200";
  let variantStyles = "";

  if (variant === "primary") {
    variantStyles = "bg-blue-600 text-white hover:bg-blue-700";
  } else if (variant === "secondary") {
    variantStyles = "bg-gray-600 text-white hover:bg-gray-700";
  } else if (variant === "outline") {
    variantStyles = "border border-gray-400 text-gray-700 hover:bg-gray-100";
  }

  return <button className={`${baseStyles} ${variantStyles} ${className}`} {...props} />;
}
