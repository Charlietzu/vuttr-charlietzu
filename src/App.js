import React, { Component } from "react";
import "./App.css";
import {
  Form,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

import axios from "axios";
const API_URL = "http://localhost:3000/tools";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: [],
      newToolModal: false,
      newToolData: {
        title: "",
        description: "",
        link: "",
        tagsText: "",
        tagspreparation: [],
        tags: [],
      },
    };
  }

  getTools() {
    axios
      .get(API_URL)
      .then((response) => {
        this.setState({ tools: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addTool() {
    axios.post(API_URL, this.state.newToolData).then((response) => {
      let { tools } = this.state;
      tools.push(response.data);
      this.setState({
        tools,
        newToolData: {
          title: "",
          description: "",
          link: "",
          tagspreparation: [],
          tags: [],
        },
      });
      this.toggleNewToolModal();
    });
  }

  deleteTool(id) {
    axios.delete(API_URL + "/" + id).then((response) => {
      this.getTools();
    });
  }

  toggleNewToolModal() {
    this.setState({
      newToolModal: !this.state.newToolModal,
      newToolData: {
        title: "",
        description: "",
        link: "",
        tagspreparation: [],
        tags: [],
      },
    });
  }

  componentDidMount() {
    this.getTools();
  }

  render() {
    let tools = this.state.tools.map((tool) => {
      return (
        <div key={tool.id} className="card mb-2">
          <a href={tool.link}>
            <h5 className="card-header card-title">{tool.title}</h5>
          </a>
          <div className="card-body">
            <p className="card-text">{tool.description}</p>
            <p className="card-text">
              {tool.tags.map((tag) => {
                return "#" + tag + " ";
              })}
            </p>
            <button
              onClick={this.deleteTool.bind(this, tool.id)}
              className="btn btn-danger"
            >
              Remove
            </button>
          </div>
        </div>
      );
    });

    return (
      <>
        <div className="container-fluid">
          <div className="jumbotron">
            <h1>VUTTR</h1>
            <h3>Very Useful Tools to Remember</h3>
          </div>
        </div>
        <div className="container mb-4">
          <Button onClick={this.toggleNewToolModal.bind(this)} color="primary">
            Add Tool
          </Button>
        </div>
        <div className="container">{tools}</div>

        <Modal
          isOpen={this.state.newToolModal}
          toggle={this.toggleNewToolModal.bind(this)}
        >
          <ModalHeader>Add a new Tool</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  placeholder="Tool Title"
                  className="form-control"
                  id="title"
                  value={this.state.newToolData.title}
                  onChange={(e) => {
                    let { newToolData } = this.state;
                    newToolData.title = e.target.value;
                    this.setState({ newToolData });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="link">Link</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="link"
                  aria-describedby="linkHelp"
                  value={this.state.newToolData.link}
                  onChange={(e) => {
                    let { newToolData } = this.state;
                    newToolData.link = e.target.value;
                    this.setState({ newToolData });
                  }}
                />
                <small id="linkHelp" className="form-text text-muted">
                  Format: http://link.com
                </small>
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="description"
                  value={this.state.newToolData.description}
                  onChange={(e) => {
                    let { newToolData } = this.state;
                    newToolData.description = e.target.value;
                    this.setState({ newToolData });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="tags">Tags</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="tags"
                  aria-describedby="tagsHelp"
                  value={this.state.newToolData.tagsText}
                  onKeyDown={(e) => {
                    let { newToolData } = this.state;
                    if (e.keyCode === 32) {
                      newToolData.tags.push(e.target.value.trim());
                      //newToolData.tagspreparation.push(e.target.value);
                      /*newToolData.tags = newToolData.tags.concat(
                        newToolData.tagspreparation
                      );*/
                      console.log("tags: ", newToolData.tags);
                      e.target.value = "";
                      e.target.focus();
                    }
                  }}
                  onChange={(e) => {
                    let { newToolData } = this.state;
                    newToolData.tagsText = e.target.value;
                    this.setState({ newToolData });
                  }}
                />
                <small id="tagsHelp" className="form-text text-muted">
                  Split the tags using the space bar.
                </small>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {" "}
            <Button
              color="secondary"
              onClick={this.toggleNewToolModal.bind(this)}
            >
              Cancel
            </Button>
            <Button color="primary" onClick={this.addTool.bind(this)}>
              Add Tool
            </Button>
          </ModalFooter>
        </Modal>
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
