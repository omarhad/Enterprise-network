/**
 * Present error message
 */
export class ApiErrors {
  constructor(errors) {
    this.errors = errors;
  }
}

/**
 * @param {string} endpoint
 * @param {object} option
 * @returns {response}
 */

export async function apiFetch(endpoint, option = {}) {
  const response = await fetch("http://localhost:3000" + endpoint, {
    ...option,
  });
  if (response === 204) {
    return null;
  }
  const responseData = await response.json();

  if (response.ok && response.code !== 11000) {
    console.log("API LOG / : ", responseData);
    return responseData;
  } else {
    if (responseData) {
      console.log("API LOGERROR / : ", responseData);
      throw new ApiErrors(responseData);
    }
  }
}
