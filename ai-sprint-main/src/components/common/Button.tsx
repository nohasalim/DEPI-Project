import { type ReactNode } from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
};

const Button = ({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  icon,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-3 rounded-lg transition-all duration-300 ${className}`}
    >
      {icon && icon}
      {icon ? <span className="block">{label}</span> : label}
    </button>
  );
};

export default Button;
