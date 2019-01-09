import React from "react";

const Field = props => {
  const {
    labelText,
    type,
    placeholder,
    name,
    value,
    id,
    onChange,
    error,
    onBlur
  } = props;

  return (
    <div className="form-group">
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        type={type}
        className="form-control"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
};

export default Field;
