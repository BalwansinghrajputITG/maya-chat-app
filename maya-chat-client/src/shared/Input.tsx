import React, { memo } from "react";

interface InputProps {
  value?: string | number | readonly string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, type, className }) => {
  return (
    <input
      className={`p-2 outline-none ${className} `}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default memo(Input);
