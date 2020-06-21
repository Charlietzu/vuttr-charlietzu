import tools from "./toolReducer";
import { combineReducers } from "redux";

/**
 * rootReducer definition file, if there is any other reducer
 * added in the application, it should be combined here.
 */

const rootReducer = combineReducers({
  tools,
});

export default rootReducer;
