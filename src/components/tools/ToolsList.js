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
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddToolPage && <Redirect to="/tool" />}
        <Jumbotron />
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-author"
          onClick={() => this.setState({ redirectToAddToolPage: true })}
        >
          Add Tool
        </button>
        <ToolCard
          tools={this.props.tools}
          onDeleteClick={this.handleDeleteTool}
        />
      </>
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
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsList);
