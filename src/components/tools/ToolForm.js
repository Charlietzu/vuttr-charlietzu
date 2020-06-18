import React from "react";
import TextInput from "../common/TextInput";
import { Button, CardColumns } from "reactstrap";

const ToolForm = ({
  tool,
  errors,
  onSave,
  onChange,
  handleTagsChange,
  tagText,
  tagsAux,
  removeTag,
}) => {
  return (
    <form onSubmit={onSave}>
      <h2 className="mt-2">Add Tool</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}

      <TextInput
        name="title"
        label="Title"
        placeholder="Tool Title"
        value={tool.title}
        onChange={onChange}
        error={errors.title}
      />

      <TextInput
        name="description"
        label="Description"
        placeholder="Description of the tool"
        value={tool.description}
        onChange={onChange}
        error={errors.description}
      />

      <TextInput
        name="link"
        label="Link"
        placeholder="https://example.com/"
        value={tool.link}
        onChange={onChange}
        error={errors.link}
      />
      <div className="form-group">
        {" "}
        <TextInput
          name="tags"
          label="Tags"
          value={tagText.text}
          onChange={handleTagsChange}
          onKeyDown={handleTagsChange}
          error={errors.tags}
        />
        <small id="tagsHelp" className="form-text text-muted">
          Type the tag and press the spacebar key.
        </small>
        <CardColumns>
          {tool.tags.map((tag) => {
            return (
              <Button
                key={tool.tags.indexOf(tag)}
                color="danger"
                className="m-2"
                onClick={(e) => e.preventDefault()}
              >
                {"#" + tag + " "}
              </Button>
            );
          })}
        </CardColumns>
      </div>

      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default ToolForm;
