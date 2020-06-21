/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import ToolCard from "./ToolCard";
import Jumbotron from "../home/Jumbotron";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import * as toolActions from "../../redux/actions/toolActions";
import {
  Button,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import "./tools.css";
import { ReactComponent as SearchIcon } from "../../icons/search-icon.svg";

/**
 * Tool List component, here i defined the search filter, add tool button, and the list of tool cards.
 * It has some handler functions too, to handle the delete action and filter action.
 */

class ToolsList extends Component {
  state = {
    redirectToAddToolPage: false,
    isChecked: false,
    inputHasValue: false,
  };

  componentDidMount() {
    const { tools, actions } = this.props;
    if (tools.length === 0) {
      actions.loadTools().catch((error) => {
        alert("Loading tools failed" + error);
      });
    } else {
      this.setState({ toolsFound: true });
    }
  }

  /** Call for the delete tool action */
  handleDeleteTool = async (tool) => {
    try {
      await this.props.actions.deleteTool(tool);
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };

  /** Call for the filter action */
  handleFilter = async (event) => {
    event.preventDefault();
    let searchTerm = event.target.filter.value;
    let filter = await this.props.actions.loadFilteredTools(searchTerm);
  };

  /**Call for the filter only by tag action */
  handleFilterByTag = async (event) => {
    event.preventDefault();
    let searchTag = event.target.filter.value;
    let filter = await this.props.actions.loadFilteredToolsByTag(searchTag);
  };

  /**Function for handling the checkbox state. */
  handleCheck() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  /**Handler for the input filter, it checks if there is any value in it to applu a conditional
   * style.
   */
  handleInputValue(e) {
    if (e.target.value !== "") {
      this.setState({ inputHasValue: true });
    } else {
      this.setState({ inputHasValue: false });
    }
  }

  render() {
    let inputClass = this.state.inputHasValue
      ? "form-control inputHasValue"
      : "form-control filterInput";
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
          <FormGroup className="mx-sm-3 mb-2 searchInput">
            <InputGroup>
              <InputGroupAddon addonType="prepend" className="inputPrepend">
                <InputGroupText>
                  <SearchIcon className="searchIcon" />
                </InputGroupText>
              </InputGroupAddon>
              <input
                type="text"
                className={inputClass}
                placeholder='Digite e aperte "ENTER"'
                onChange={(e) => this.handleInputValue(e)}
                name="filter"
              />
            </InputGroup>
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
