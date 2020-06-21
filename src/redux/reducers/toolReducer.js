import * as types from "../actions/actionTypes";

export const initialState = [];

/**
 * toolReducer definition file.
 */

/**
 * toolReducer function, it returns a new state based on the action
 * passed via argument.
 * @param {array} state
 * @param {object} action
 * @returns {array} state
 */
export default function toolReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_TOOLS_SUCCESS:
      return action.tools;
    case types.CREATE_TOOL_SUCCESS:
      return [...state, { ...action.tool }];
    case types.REMOVE_TOOL_SUCCESS:
      /**Returns a new array with all the tools, but with one tool omitted, the tool
       * that has the tool ID that we're trying to delete.
       */
      return state.filter((tool) => tool.id !== action.tool.id);
    default:
      return state;
  }
}
