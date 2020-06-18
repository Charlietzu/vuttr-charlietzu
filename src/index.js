import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import configureStore from "./redux/configureStore.dev";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./fonts/SourceSansPro-Regular.ttf";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
