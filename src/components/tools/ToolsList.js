import React, { Component } from "react";
import ToolCard from "./ToolCard";
import Jumbotron from "../home/Jumbotron";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import * as toolActions from "../../redux/actions/toolActions";

class ToolsList extends Component {
  state = {
    redirectToAddToolPage: false,
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
    console.log(this.props.tools);
  };

  render() {
    return (
      <div>
        {this.state.redirectToAddToolPage && <Redirect to="/tool" />}
        <Jumbotron />
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-author"
          onClick={() => this.setState({ redirectToAddToolPage: true })}
        >
          Add Tool
        </button>
        <form onSubmit={this.handleFilter} className="form-inline float-right">
          <div className="form-group mx-sm-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar"
              name="filter"
            />
          </div>
        </form>
        <ToolCard
          tools={this.props.tools}
          onDeleteClick={this.handleDeleteTool}
        />
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
      loadFilteredTools: bindActionCreators(toolActions.filterTools, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsList);
