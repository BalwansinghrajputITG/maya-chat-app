import React, { memo } from "react";

const btnType = {
  primary: "text-white  bg-sky-600 ",
  secondry: "text-black bg-white",
} as const;

type ButtonType = keyof typeof btnType;

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type: ButtonType;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  className,
}) => {
  const buttonType = btnType[type];
  return (
    <button
      className={
        "capitalize font-bold cursor-pointer  px-4 py-2 rounded " +
        buttonType +
        " " +
        className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(Button);
