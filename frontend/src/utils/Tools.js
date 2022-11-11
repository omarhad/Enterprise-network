/**
 * Upper case a string
 */
export function upperCase(content) {
  return content.toUpperCase();
}

/**
 * Get the current date
 * @param {string} format
 * @returns {string} The current date
 */

export function birthdayParser(birthday) {
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let timestamp = Date.parse(birthday);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
}

/**
 * check if value is empty
 * @param {string} value
 * @returns
 */
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
/**
 * Format a date
 * @param {String} num
 * @returns {String} The formatted date
 */
export const dateParser = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekend: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};
