/* eslint-disable no-useless-concat */
import React from "react";
import "./common.css";

/**
 * Text Input reusable stateless component.
 */

const TextInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  onKeyDown,
  className,
}) => {
  let wrapperClass = "form-group form";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default TextInput;
