import rootReducer from "./reducers/index";
import { createStore, compose, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

/**
 * Store configuration file, if we need to make a production build
 * we need to create a file that uses "prod" instead of "dev", using
 * the configs needed.
 */

/**
 * Store configuration function
 * @param {array} initialState
 * @returns {function} createStore()
 */
export default function configureStore(initialState) {
  /**add support for Redux dev tools */
  const composeEnhancers =
    window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    initialState,
    /**reduxImmutableStateInvariant will warn us if we accidentally mutate
     * redux state
     */
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
