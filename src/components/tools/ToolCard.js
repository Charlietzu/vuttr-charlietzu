import React from "react";
import { Button } from "reactstrap";

const ToolCard = ({ tool, toggleEditToolModal, deleteTool }) => (
  <div key={tool.id} className="card mb-2">
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
        onClick={toggleEditToolModal.bind(this)}
        color="success"
      >
        Edit Tool
      </Button>
      <Button className="m-1" onClick={(e) => console.log(this)} color="danger">
        Remove
      </Button>
    </div>
  </div>
);

/*
deleteTool.bind(this, tool.id)
<div key={tool.id} className="card mb-2">
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
        onClick={toggleEditToolModal.bind(this)}
        color="success"
      >
        Edit Tool
      </Button>
      <Button
        className="m-1"
        onClick={deleteTool.bind(this, tool.id)}
        color="danger"
      >
        Remove
      </Button>
    </div>
  </div> */
export default ToolCard;
