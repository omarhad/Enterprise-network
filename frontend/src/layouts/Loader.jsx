import React from "react";

/**
 * Component Loader
 * @param {*} props
 * @returns div => Loader
 */
export function Loader({ ...props }) {
  return <div {...props}>{props.children}</div>;
}
