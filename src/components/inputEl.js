import React, { useState } from "react";

const InputEl = ({
  label,
  type = "text",
  placeholder = "",
  onValueChange,
  name = "",
  id = "",
  className = "",
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (onValueChange) {
      onValueChange(inputValue);
    }
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className="text-sm font-Polysans font-medium text-[#0d0c22] space-x-1"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id || name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="rounded-md pl-2 px-4 outline-none border  h-[40px] font-normal text-[14px] text-[#0d0c22] font-Polysans flex justify-center"
      />
    </div>
  );
};

export default InputEl;
