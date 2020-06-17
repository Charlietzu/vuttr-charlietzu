import * as types from "../actions/actionTypes";

export const initialState = [];

export default function toolReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_TOOLS_SUCCESS:
      return action.tools;
    case types.LOAD_FILTERED_TOOLS_SUCCESS:
      return state.filter((tool) => tool.title === action.searchTerm);
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
