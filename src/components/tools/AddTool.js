import React, { useState } from "react";
import { connect } from "react-redux";
import * as toolActions from "../../redux/actions/toolActions";
import ToolForm from "./ToolForm";
import { newTool } from "../../api/utilData";

/**
 * Add Tool component, here i defined some handler to save the tool, conditional styling for the
 * inputs, and handling the addition of tags.
 */

export function AddTool({ saveTool, history, ...props }) {
  const [tool, setTool] = useState({ ...props.tool });
  const [errors, setErrors] = useState({});
  /** Tags Aux is the auxiliar array which i use for setting the tags in the tool state. */
  const [tagsAux, setTagsAux] = useState([]);
  /** Tag Text is the state for the text inside the input. */
  const [tagText, setTagText] = useState({ text: "" });
  const [inputHasValue, setInputHasValue] = useState(false);

  /**Handler for saving the tool. */
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

  /**Handler for setting a conditional style for the text inputs. */
  function handleInputValue(value) {
    if (value !== "") {
      setInputHasValue(true);
    } else {
      setInputHasValue(false);
    }
  }

  /**onChange handler for the tags input, it will clear the tagtext after pressing space bar (keycode 32)
   * and add the input value to the tagsAux array, which will be passed for the tags array in the tool,
   * which we are adding.
   */
  function handleTagsChange(event) {
    handleInputValue(event.target.value);
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
  /**onChange handle for general inputs. */
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
