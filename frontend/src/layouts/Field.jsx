import React from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";

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

      {props.textarea ? (
        <textarea
          type={type}
          name={name}
          id={name}
          ref={refField}
          {...props}
        ></textarea>
      ) : (
        <input type={type} name={name} id={name} ref={refField} {...props} />
      )}

      {error && <Modal>{error[errType]}</Modal>}
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
