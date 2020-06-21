import * as types from "./actionTypes";
import * as toolApi from "../../api/toolApi";

/**
 * Tools actions definitions file.
 */

/**
 * This function is called after the loadTools api function
 * is done with success.
 * @param {array} tools
 */
export function loadToolsSuccess(tools) {
  return {
    type: types.LOAD_TOOLS_SUCCESS,
    tools,
  };
}

/**
 * This function is called after the saveTool api function
 * is done with success.
 * @param {object} tool
 */
export function createToolSuccess(tool) {
  return {
    type: types.CREATE_TOOL_SUCCESS,
    tool,
  };
}

/**
 * This function is called after the deleteTool api function
 * is done with success.
 * @param {object} tool
 */
export function deleteToolSuccess(tool) {
  return {
    type: types.REMOVE_TOOL_SUCCESS,
    tool,
  };
}

/**
 * This function loads the tools array by making the API call.
 */
export function loadTools() {
  return function (dispatch) {
    /**Redux thunk injects dispatch so we don't have to. */
    return toolApi
      .getTools()
      .then((tools) => {
        /**we call this function loadToolsSuccess because we already
         * have a function called loadTools, which is our thunk
         */
        dispatch(loadToolsSuccess(tools));
      })
      .catch((error) => {
        throw error;
      });
  };
}

/**
 * This function save the tool object in the API.
 * @param {object} tool
 */
export function saveTool(tool) {
  return function (dispatch) {
    return toolApi
      .saveTool(tool)
      .then((savedTool) => {
        dispatch(createToolSuccess(savedTool));
      })
      .catch((error) => {
        throw error;
      });
  };
}

/**
 * This function remove the tool object in the API.
 * @param {object} tool
 */
export function deleteTool(tool) {
  return function (dispatch) {
    dispatch(deleteToolSuccess(tool));
    return toolApi.deleteTool(tool.id);
  };
}

/**
 * This function loads the tools array by making the API call, filtering by the
 * searchTerm.
 * @param {string} searchTerm
 */
export function filterToolsByGlobal(searchTerm) {
  return function (dispatch) {
    return toolApi
      .filterToolByGlobal(searchTerm)
      .then((tools) => {
        dispatch(loadToolsSuccess(tools));
      })
      .catch((error) => {
        throw error;
      });
  };
}

/**
 * This function loads the tools array by making the API call, filtering by each that
 * matches the searchTag.
 * @param {string} searchTag
 */
export function filterToolsByTag(searchTag) {
  return function (dispatch) {
    return toolApi
      .filterToolsByTag(searchTag)
      .then((tools) => {
        dispatch(loadToolsSuccess(tools));
      })
      .catch((error) => {
        throw error;
      });
  };
}
