import React, { useState } from "react";
import { connect } from "react-redux";
import * as toolActions from "../../redux/actions/toolActions";
import ToolForm from "./ToolForm";
import { bindActionCreators } from "redux";
import { newTool } from "../../api/utilData";

export function AddTool({ saveTool, history, ...props }) {
  const [tool, setTool] = useState({ ...props.tool });
  const [errors, setErrors] = useState({});

  function handleSave(event) {
    event.preventDefault();
    saveTool(tool)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        setErrors({ onSave: error.message });
      });
  }

  function handleChange({ target }) {
    setTool({
      ...tool,
      //[target["tags"]]: [target.value],
      /* ...(target.name === "tags"
        ? { [target.name]: [target.value] }
        : console.log("nao e")),

        ...(target.name === "tags"
        ? { [target.name]: [target.name.push(target.value)] }
        : console.log("nao e")),
      [target.name]: target.value, */
      ...(target.name === "tags"
        ? console.log(target.value.push(target.value))
        : console.log("nao e")),
      [target.name]: target.value,
    });
  }

  return (
    <ToolForm
      tool={tool}
      errors={errors}
      onSave={handleSave}
      onChange={handleChange}
    />
  );
}

function mapStateToProps(state) {
  const tool = newTool;
  return {
    tool,
  };
}

const mapDispatchToProps = {
  saveTool: toolActions.saveTool,
};
/* 
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      saveTool: bindActionCreators(toolActions.saveTool, dispatch),
    },
  };
} */

export default connect(mapStateToProps, mapDispatchToProps)(AddTool);
