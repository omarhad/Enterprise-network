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

export const timestampParser = (timestamp) => {
  var date = new Date(timestamp);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return (
    (day < 10 ? "0" + day : day) +
    "/" +
    (month < 10 ? "0" + month : month) +
    "/" +
    year +
    " " +
    (hour < 10 ? "0" + hour : hour) +
    ":" +
    (minute < 10 ? "0" + minute : minute) +
    ":" +
    (second < 10 ? "0" + second : second)
  );
};
