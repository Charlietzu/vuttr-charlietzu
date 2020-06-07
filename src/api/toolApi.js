import { handleResponse, handleError } from "./apiUtils";

const API_URL = "http://localhost:3000/tools";

export function getTools() {
  return fetch(API_URL).then(handleResponse).catch(handleError);
}

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

export function deleteTool(toolId) {
  return fetch(API_URL + "/" + toolId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
