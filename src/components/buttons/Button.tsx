import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  disabled,
  loading,
  className,
  ...props
}) => {
  const baseClasses = clsx(
    "btn", // DaisyUI asosiy btn classi
    "rounded-[20px]",
    {
      "btn-ghost p-3 text-sm font-medium text-primaryWhite bg-primaryClicked border-none": variant === "primary",
      "btn-ghost p-3 text-sm font-medium text-tertiary bg-islandInner border-none": variant === "outline",
      "btn-secondary": variant === "secondary",
      "btn-ghost": variant === "ghost",
      "btn-disabled": disabled || loading,
    },
    className
  );

  return (
    <button className={baseClasses} disabled={disabled || loading} {...props}>
      {loading && <span className="loading loading-spinner loading-sm mr-2" />}
      {children}
    </button>
  );
};

export default Button;
