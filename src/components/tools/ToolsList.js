import React from "react";
import ToolCard from "./ToolCard";

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
/* <ToolCard
        tool={tool}
        toggleEditToolModal={toggleEditToolModal}
        deleteTool={deleteTool}
      /> */
export default ToolsList;
