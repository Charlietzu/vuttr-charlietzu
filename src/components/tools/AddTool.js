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
  const [inputHasValue, setInputHasValue] = useState(false);

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
  }

  function handleInputValue(value) {
    if (value !== "") {
      setInputHasValue(true);
    } else {
      setInputHasValue(true);
    }
  }

  function handleChange({ target }) {
    handleInputValue(target.value);
    setTool({
      ...tool,
      [target.name]: [target.value],
    });
  }

  return (
    <ToolForm
      tool={tool}
      errors={errors}
      onSave={handleSave}
      onChange={handleChange}
      handleTagsChange={handleTagsChange}
      tagText={tagText}
      inputHasValue={inputHasValue}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddTool);
