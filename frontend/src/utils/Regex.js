/**
 * Function to validate email
 * @param {String} input    | input to be validated
 * @returns {Boolean}       | true if input is valid, false otherwise
 */
export function verificationEmail(input) {
  let regEx = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
  if (regEx.test(input) && input !== "") {
    return true;
  } else {
    return false;
  }
}

/**
 * Function to validate password
 * @param {String} input    | input to be validated
 * @returns {Boolean}       | true if input is valid, false otherwise
 */
export function verificationPassword(input) {
  let regEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (regEx.test(input) && input !== "") {
    return true;
  } else {
    return false;
  }
}

/**
 * Function to validate password
 * @param {String} input    | input to be validated
 * @returns {Boolean}       | true if input is valid, false otherwise
 */
export function verificationVarious(input) {
  let regEx = /^[a-zA-ZàâäéèêëîïôöûüùçÀÂÄÉÈÊËÎÏÔÖÛÜÙÇ'-']+$/;
  if (regEx.test(input) && input !== "") {
    return true;
  } else {
    return false;
  }
}
