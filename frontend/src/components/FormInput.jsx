import React from "react";
import "../styles/Field.css";

const FormInput = ({
  type,
  name,
  className,
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <>
      <input
        type={type}
        id={name}
        name={name}
        className={className}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </>
  );
};

export default FormInput;
