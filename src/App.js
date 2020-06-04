import React, { Component } from "react";
import "./App.css";

import Jumbotron from "./components/home/Jumbotron";
import ToolsList from "./components/tools/ToolsList";

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
        tags: [],
      },
      editToolModal: false,
      editToolData: {
        id: "",
        title: "",
        description: "",
        link: "",
        tagsText: "",
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
          tags: [],
        },
      });
      this.toggleNewToolModal();
    });
  }

  deleteTool(id) {
    console.log(this);
    /*
    axios.delete(API_URL + "/" + id).then((response) => {
      this.getTools();
    });
    */
  }

  removeTag(tagText, event) {
    let { newToolData } = this.state;
    event.preventDefault();
    newToolData.tags = newToolData.tags.filter((tag) => tag !== tagText);
    this.setState({ newToolData });
  }

  toggleNewToolModal() {
    this.setState({
      newToolModal: !this.state.newToolModal,
      newToolData: {
        title: "",
        description: "",
        link: "",
        tags: [],
      },
    });
  }

  editTool(id, title, description, link, tags) {
    this.setState({
      editToolData: { id, title, description, link, tags },
      editToolModal: !this.state.editToolModal,
    });
  }

  updateTool() {
    let { title, description, link, tags } = this.state.editToolData;
    axios
      .put(API_URL + "/" + this.state.editToolData.id, {
        title,
        description,
        link,
        tags,
      })
      .then((response) => {
        this.getTools();

        this.setState({
          editToolModal: false,
          editToolData: {
            id: "",
            title: "",
            description: "",
            link: "",
            tagsText: "",
            tags: [],
          },
        });
      });
  }

  toggleEditToolModal() {
    this.setState({
      editToolModal: !this.state.editToolModal,
    });
  }

  setEditToolData(id, title, description, link, tags) {
    this.setState({
      editToolData: {
        id,
        title,
        description,
        link,
        tags,
      },
    });
  }

  componentDidMount() {
    this.getTools();
  }

  render() {
    return (
      <>
        <Jumbotron />
        <ToolsList
          tools={this.state.tools}
          toggleEditToolModal={this.toggleEditToolModal}
          deleteTool={this.deleteTool}
        />
      </>
    );
  }
  /*

 
  render() {
    let tools = this.state.tools.map((tool) => {
      return (
        <div key={tool.id} className="card mb-2">
          <a href={tool.link} target="_blank">
            <h5 className="card-header card-title">{tool.title}</h5>
          </a>
          <div className="card-body">
            <p className="card-text">{tool.description}</p>
            <p className="card-text">
              {tool.tags.map((tag) => {
                return "#" + tag + " ";
              })}
            </p>
            <Button
              className="m-1"
              onClick={this.toggleEditToolModal.bind(this)}
              color="success"
            >
              Edit Tool
            </Button>
            <Button
              className="m-1"
              onClick={this.deleteTool.bind(this, tool.id)}
              color="danger"
            >
              Remove
            </Button>
          </div>
        </div>
      );
    });

    return (
      <>
        <Jumbotron />
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
                <div>
                  {this.state.newToolData.tags.map((tag) => {
                    return (
                      <Button
                        key={this.state.newToolData.tags.indexOf(tag)}
                        onClick={(e) => {
                          this.removeTag(tag, e);
                        }}
                        color="danger"
                        className="m-2"
                      >
                        {"#" + tag + " "}
                      </Button>
                    );
                  })}
                </div>
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

        <Modal
          isOpen={this.state.editToolModal}
          toggle={this.toggleEditToolModal.bind(this)}
        >
          <ModalHeader>Edit Tool</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  placeholder="Tool Title"
                  className="form-control"
                  id="title"
                  value={this.state.editToolData.title}
                  onChange={(e) => {
                    let { editToolData } = this.state;
                    editToolData.title = e.target.value;
                    this.setState({ editToolData });
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
                  value={this.state.tools.link}
                  onChange={(e) => {
                    let { editToolData } = this.state;
                    editToolData.link = e.target.value;
                    this.setState({ editToolData });
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
                  value={this.state.editToolData.description}
                  onChange={(e) => {
                    let { editToolData } = this.state;
                    editToolData.description = e.target.value;
                    this.setState({ editToolData });
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
                  value={this.state.editToolData.tagsText}
                  onKeyDown={(e) => {
                    let { editToolData } = this.editToolData;
                    if (e.keyCode === 32) {
                      editToolData.tags.push(e.target.value.trim());
                      e.target.value = "";
                      e.target.focus();
                    }
                  }}
                  onChange={(e) => {
                    let { editToolData } = this.state;
                    editToolData.tagsText = e.target.value;
                    this.setState({ editToolData });
                  }}
                />
                <small id="tagsHelp" className="form-text text-muted">
                  Split the tags using the space bar.
                </small>
                <div>
                  {this.state.editToolData.tags.map((tag) => {
                    return (
                      <Button
                        key={this.state.editToolData.tags.indexOf(tag)}
                        onClick={(e) => {
                          this.removeTag(tag, e);
                        }}
                        color="danger"
                        className="m-2"
                      >
                        {"#" + tag + " "}
                      </Button>
                    );
                  })}
                </div>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {" "}
            <Button
              color="secondary"
              onClick={this.toggleEditToolModal.bind(this)}
            >
              Cancel
            </Button>
            <Button color="primary" onClick={this.updateTool.bind(this)}>
              Edit Tool
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
*/
}
export default App;
