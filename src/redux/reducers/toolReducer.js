import * as types from "../actions/actionTypes";

export const initialState = [];

export default function toolReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_TOOL_SUCCESS:
      return [...state, { ...action.tool }];
    default:
      return state;
  }
}
