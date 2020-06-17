/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Button } from "reactstrap";

const ToolCard = ({ tools, onDeleteClick }) =>
  tools.map((tool) => {
    return (
      <div key={tool.id} className="card mt-2 mb-2">
        <a href={tool.link} target="_blank">
          <h5 className="card-header card-title">{tool.title}</h5>
        </a>
        <div className="card-body">
          <p className="card-text">{tool.description}</p>
          <p className="card-text">
            {tool.tags.map((tag) => {
              return "#" + tag + " ";
            })}
          </p>
          <Button
            className="m-1"
            onClick={() => onDeleteClick(tool)}
            color="danger"
          >
            Remove
          </Button>
        </div>
      </div>
    );
  });

export default ToolCard;
