/**
 * Function to display an alert message
 * @param {String} param | The message to be displayed
 * @returns
 */
export function Alert({ children, ...props }) {
  return <div {...props}>{children}</div>;
}
