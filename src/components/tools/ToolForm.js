import React from "react";
import TextInput from "../common/TextInput";

const ToolForm = ({ tool, errors, onSave, onChange }) => {
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
        onChange={(e) => {}}
        error={errors.link}
      />
      <div className="form-group">
        {" "}
        <TextInput
          name="tags"
          label="Tags"
          value={tool.tags}
          onChange={onChange}
          error={errors.tags}
        />
        <small id="tagsHelp" class="form-text text-muted">
          Type the tag and press the spacebar key.
        </small>
      </div>

      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default ToolForm;
