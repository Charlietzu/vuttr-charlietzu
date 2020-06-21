import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import ToolsList from "./components/tools/ToolsList";
import AddTool from "./components/tools/AddTool";
import Header from "./components/common/Header";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <Switch>
          <Route exact path="/" component={ToolsList} />
          <Route path="/tool" component={AddTool} />
        </Switch>
      </div>
    );
  }
}
export default App;
