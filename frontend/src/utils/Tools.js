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
