import React, { Component } from "react";
import ToolCard from "./ToolCard";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as toolActions from "../../redux/actions/toolActions";

class ToolsList extends Component {
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
      <ToolCard
        tools={this.props.tools}
        onDeleteClick={this.handleDeleteTool}
      />
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

/* <ToolCard
        tool={tool}
        toggleEditToolModal={toggleEditToolModal}
        deleteTool={deleteTool}
      /> */

/* 
const ToolsList = ({ tools, toggleEditToolModal, deleteTool }) => (
  <div className="container">
    {tools.map((tool) => (
      <ToolCard
        key={tool.id}
        tool={tool}
        toggleEditToolModal={toggleEditToolModal}
        deleteTool={deleteTool}
      />
    ))}
  </div>
);
 */ export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolsList);
