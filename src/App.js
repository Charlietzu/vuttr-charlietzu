import React, { Component } from "react";
import "./App.css";
import { render } from "@testing-library/react";
import axios from "axios";
const API_URL = "http://localhost:3000/tools";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: [],
    };
  }

  getTools() {
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response.data);
        this.setState({ tools: response.data });
        console.log(this.state.tools);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getTools();
  }

  render() {
    //let tools = this.state.tools.map((tool) => {})
    return (
      <>
        <div className="container-fluid">
          <div className="jumbotron">
            <h1>VUTTR</h1>
            <h3>Very Useful Tools to Remember</h3>
          </div>
        </div>
        <div className="card">
          <a href="#">
            <h5 className="card-header card-title">Title</h5>
          </a>
          <div className="card-body">
            <p className="card-text">Description</p>
            <p className="card-text">Tags</p>
            <button className="btn btn-danger">Remove</button>
          </div>
        </div>
      </>
    );
  }
}

/*
async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}
*/

export default App;
