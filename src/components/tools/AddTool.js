import React, { useState } from "react";
import { connect } from "react-redux";
import * as toolActions from "../../redux/actions/toolActions";
import ToolForm from "./ToolForm";
import { newTool } from "../../api/utilData";

export function AddTool({ saveTool, history, ...props }) {
  const [tool, setTool] = useState({ ...props.tool });
  const [errors, setErrors] = useState({});
  const [tagsAux, setTagsAux] = useState([]);
  const [tagText, setTagText] = useState({ text: "" });

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

  function handleTagsChange(event) {
    setTagText({ text: event.target.value });
    if (event.keyCode === 32) {
      setTagsAux((tagsAux) => [...tagsAux, tagText.text.trim()]);
      setTagText({ text: "" });
    }
    setTool({
      ...tool,
      tags: tagsAux,
    });
    /*     console.log("tagText: ", tagText);
    console.log("tagsAux: ", tagsAux);
    console.log("tool tags: ", tool.tags); */
  }

  function handleChange({ target }) {
    setTool({
      ...tool,
      [target.name]: [target.value],
    });
  }

  return (
    <ToolForm
      tool={tool}
      tagText={tagText}
      errors={errors}
      onSave={handleSave}
      onChange={handleChange}
      handleTagsChange={handleTagsChange}
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
