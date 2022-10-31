import React from "react";
import PropTypes from "prop-types";

export function Field({
  name,
  children,
  type = "text",
  error,
  errType,
  refField = null,
  ...props
}) {
  return (
    <>
      {children && <label htmlFor={name}>{children}</label>}

      <input type={type} name={name} id={name} ref={refField} {...props} />

      {error && <p className="">{error[errType]}</p>}
    </>
  );
}

Field.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  error: PropTypes.object,
  ref: PropTypes.object,
};
