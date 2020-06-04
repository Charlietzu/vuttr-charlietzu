import * as types from "./actionTypes";
import * as toolApi from "../../api/toolApi";

export function createToolSuccess(tool) {
  return {
    type: types.CREATE_TOOL_SUCCESS,
    tool,
  };
}

export function saveTool(tool) {
  return function (dispatch) {
    return toolApi.saveTool(tool).then((savedTool) => {
      dispatch(createToolSuccess(savedTool)).catch((error) => {
        throw error;
      });
    });
  };
}
