/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Button, Card, CardTitle, CardBody, CardText } from "reactstrap";
import styles from "../common/Styles";

const ToolCard = ({ tools, onDeleteClick }) =>
  tools.map((tool) => {
    return (
      <Card key={tool.id} className="m-3" style={styles.cardBox}>
        <CardTitle className="mt-3 ml-3">
          <h5 style={{ fontWeight: "bold" }}>
            <a href={tool.link} target="_blank" style={{ color: "#170c3a" }}>
              {tool.title}
            </a>
          </h5>
        </CardTitle>

        <CardBody>
          <CardText>{tool.description}</CardText>
          <CardText>
            {tool.tags.map((tag) => {
              return "#" + tag + " ";
            })}
          </CardText>
          <Button
            className="m-1"
            style={styles.buttonRemove}
            onClick={() => onDeleteClick(tool)}
          >
            Remove
          </Button>
        </CardBody>
      </Card>
    );
  });

export default ToolCard;

/*<div key={tool.id} className="card mt-2 mb-2">
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
      </div>*/
