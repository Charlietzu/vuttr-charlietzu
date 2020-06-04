import deepFreeze from "deep-freeze";
import { expect } from "chai";

import toolReducer from "./toolReducer";
import * as actions from "../actions/toolActions";

it("toolReducer should be a function", () => {
  expect(toolReducer).to.be.a("function");
});

it("should add a tool", () => {
  const initialState = deepFreeze([]);
  const newTool = deepFreeze({
    id: 0,
    title: "Test",
    description: "Another test",
    link: "link test",
    tags: ["test1", "test2", "test3"],
  });

  const action = actions.createToolSuccess(newTool);
  const newState = toolReducer(initialState, action);

  const after = [
    {
      id: 0,
      title: "Test",
      description: "Another test",
      link: "link test",
      tags: ["test1", "test2", "test3"],
    },
  ];
  expect(toolReducer(initialState, action)).to.be.deep.equal(after);
  expect(newState.length).to.be.equal(1);
  expect(newState[0].title).to.be.equal("Test");
});
