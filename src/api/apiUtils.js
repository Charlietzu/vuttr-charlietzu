/**
 * Utility methods for the API.
 */

/**
 * This function handle the response returned by the API call.
 * @param {object} response
 */
export async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

/**
 * This function show and throw the error returned by the API call.
 * @param {string} error
 */
export function handleError(error) {
  console.error("API call failed: " + error);
  throw error;
}
