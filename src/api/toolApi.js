import { handleResponse, handleError } from "./apiUtils";

/**
 * Functions to call the API requests.
 */

const API_URL = "http://localhost:3000/tools";

/**
 * This function get the Tools array in the API.
 * @returns {Array} tools objects.
 */
export function getTools() {
  return fetch(API_URL).then(handleResponse).catch(handleError);
}

/**
 * This function save (via POST) a Tool object in the API.
 * @param {Object} tool
 */
export function saveTool(tool) {
  /*The API used for this application doesn't have the PUT route, anyway i have implemented the PUT call here, in case of need. */
  return fetch(API_URL + (tool.id || ""), {
    method: tool.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(tool),
  })
    .then(handleResponse)
    .catch(handleError);
}

/**
 * This function removes a tool object in the API.
 * @param {number} toolId
 */
export function deleteTool(toolId) {
  return fetch(API_URL + "/" + toolId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

/**
 * This function return an array of tools containing the searchterm in it.
 * @param {string} searchTerm
 * @return {Array} tools objects.
 */
export function filterToolByGlobal(searchTerm) {
  return fetch(API_URL + "?q=" + searchTerm)
    .then(handleResponse)
    .catch(handleError);
}

/**
 * This function return an array of tools containing the searchTag in it.
 * @param {string} searchTag
 * @return {Array} tools objects.
 */
export function filterToolsByTag(searchTag) {
  return fetch(API_URL + "?tags_like=" + searchTag)
    .then(handleResponse)
    .catch(handleError);
}
