/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import ToolCard from "./ToolCard";
import Jumbotron from "../home/Jumbotron";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import * as toolActions from "../../redux/actions/toolActions";
import { Button, Form, FormGroup } from "reactstrap";
import "./tools.css";

class ToolsList extends Component {
  state = {
    redirectToAddToolPage: false,
    isChecked: false,
  };

  componentDidMount() {
    const { tools, actions } = this.props;

    if (tools.length === 0) {
      actions.loadTools().catch((error) => {
        alert("Loading tools failed" + error);
      });
    }
  }

  handleDeleteTool = async (tool) => {
    try {
      /**In async calls, it pauses on each await keyword and continue when the async call is completed.  */
      await this.props.actions.deleteTool(tool);
      console.log(this.props.tools);
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };

  handleFilter = async (event) => {
    event.preventDefault();
    let searchTerm = event.target.filter.value;
    let filter = await this.props.actions.loadFilteredTools(searchTerm);
  };

  handleFilterByTag = async (event) => {
    event.preventDefault();
    let searchTag = event.target.filter.value;
    let filter = await this.props.actions.loadFilteredToolsByTag(searchTag);
  };

  handleCheck() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    return (
      <div>
        {this.state.redirectToAddToolPage && <Redirect to="/tool" />}
        <Jumbotron />
        <Button
          className="buttonAdd"
          onClick={() => this.setState({ redirectToAddToolPage: true })}
        >
          Add Tool
        </Button>
        <Form
          onSubmit={
            this.state.isChecked ? this.handleFilterByTag : this.handleFilter
          }
          className="form-inline float-right"
        >
          <FormGroup className="mx-sm-3 mb-2">
            <input
              type="text"
              className="form-control filterInput"
              placeholder="Buscar"
              name="filter"
            />
          </FormGroup>
          <div className="form-check checkTag">
            <input
              type="checkbox"
              className="form-check-input"
              id="tagsOnly"
              onChange={this.handleCheck.bind(this)}
            />
            <label className="checkLabel" htmlFor="tagsOnly">
              Search in tags only
            </label>
          </div>
        </Form>
        <div className="mt-3">
          <ToolCard
            tools={this.props.tools}
            onDeleteClick={this.handleDeleteTool}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tools: state.tools,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTools: bindActionCreators(toolActions.loadTools, dispatch),
      deleteTool: bindActionCreators(toolActions.deleteTool, dispatch),
      loadFilteredTools: bindActionCreators(
        toolActions.filterToolsByGlobal,
        dispatch
      ),
      loadFilteredToolsByTag: bindActionCreators(
        toolActions.filterToolsByTag,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsList);
