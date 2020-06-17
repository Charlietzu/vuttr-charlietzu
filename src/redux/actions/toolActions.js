import * as types from "./actionTypes";
import * as toolApi from "../../api/toolApi";

export function loadToolsSuccess(tools) {
  return {
    type: types.LOAD_TOOLS_SUCCESS,
    tools,
  };
}

export function createToolSuccess(tool) {
  return {
    type: types.CREATE_TOOL_SUCCESS,
    tool,
  };
}

export function deleteToolSuccess(tool) {
  return {
    type: types.REMOVE_TOOL_SUCCESS,
    tool,
  };
}

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

export function deleteTool(tool) {
  return function (dispatch) {
    dispatch(deleteToolSuccess(tool));
    return toolApi.deleteTool(tool.id);
  };
}

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
