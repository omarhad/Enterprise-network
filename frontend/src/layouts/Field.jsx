import React from "react";
import PropTypes from "prop-types";

export function Field({
  name,
  children,
  type = "text",
  error,
  refField = null,
  ...props
}) {
  return (
    <div className="form-group">
      {children && <label htmlFor={name}>{children}</label>}

      <input type={type} name={name} id={name} ref={refField} {...props} />

      {error && <p className="">{error[name]}</p>}
    </div>
  );
}

Field.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  error: PropTypes.object,
  ref: PropTypes.object,
};
