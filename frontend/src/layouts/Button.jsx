import React from "react";
import PropTypes from "prop-types";
import { Loader } from "./Loader";

/**
 * Component Button
 * @param {Object} props
 * @param {string} type
 * @param {boolean} loading
 * @returns
 */
export default function Button({
  children,
  type = "primary",
  loading = false,
  ...props
}) {
  let htmlType = null;
  if (type === "submit") {
    htmlType = "submit";
  }
  return (
    <button type={htmlType} disabled={loading} {...props}>
      {loading ? (
        <>
          <Loader /> Chargement...
        </>
      ) : (
        children
      )}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  loading: PropTypes.bool,
};
