/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Button, Card, CardTitle, CardBody, CardText } from "reactstrap";
import "./tools.css";

/**
 * Individual ToolCard stateless component.
 */

const ToolCard = ({ tools, onDeleteClick }) =>
  tools.map((tool) => {
    return (
      <>
        <Card key={tool.id} className="m-3 cardBox">
          <CardTitle className="mt-3 ml-3">
            <h5 style={{ fontWeight: "bold" }}>
              <a href={tool.link} target="_blank">
                {tool.title}
              </a>
            </h5>
          </CardTitle>

          <CardBody>
            <CardText>{tool.description}</CardText>
            <CardText style={{ fontWeight: "bold" }}>
              {tool.tags.map((tag) => {
                return "#" + tag + " ";
              })}
            </CardText>
            <Button
              className="m-1 buttonRemove"
              onClick={() => onDeleteClick(tool)}
            >
              Remove
            </Button>
          </CardBody>
        </Card>
      </>
    );
  });

export default ToolCard;
