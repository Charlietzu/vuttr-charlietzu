import tools from "./toolReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  tools,
});

export default rootReducer;