import { handleResponse, handleError } from "./apiUtils";

const API_URL = "http://localhost:3000/tools";

export function saveTool(tool) {
  return fetch(API_URL + (tool.id || ""), {
    method: tool.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(tool),
  })
    .then(handleResponse)
    .catch(handleError);
}
