import deepFreeze from "deep-freeze";
import { expect } from "chai";

import toolReducer, { initialState } from "./toolReducer";
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

  const afterState = [
    {
      id: 0,
      title: "Test",
      description: "Another test",
      link: "link test",
      tags: ["test1", "test2", "test3"],
    },
  ];
  expect(newState).to.be.deep.equal(afterState);
  expect(newState.length).to.be.equal(1);
  expect(newState[0].title).to.be.equal("Test");
});

it("should add another tool", () => {
  const initialState = deepFreeze([
    {
      id: 0,
      title: "Test",
      description: "Another test",
      link: "link test",
      tags: ["test1", "test2", "test3"],
    },
  ]);
  const newTool = deepFreeze({
    id: 1,
    title: "Test New",
    description: "Another new test",
    link: "link for the test",
    tags: ["test1", "test4", "test2"],
  });

  const action = actions.createToolSuccess(newTool);
  const newState = toolReducer(initialState, action);

  const afterState = [
    {
      id: 0,
      title: "Test",
      description: "Another test",
      link: "link test",
      tags: ["test1", "test2", "test3"],
    },
    {
      id: 1,
      title: "Test New",
      description: "Another new test",
      link: "link for the test",
      tags: ["test1", "test4", "test2"],
    },
  ];
  expect(newState).to.be.deep.equal(afterState);
  expect(newState.length).to.be.equal(2);
  expect(newState[0].title).to.be.equal("Test");
  expect(newState[1].title).to.be.equal("Test New");
});

it("should add a tool with a tag inside an array", () => {
  const initialState = deepFreeze([]);
  const newTool = deepFreeze({
    id: 0,
    title: "Test",
    description: "Another test",
    link: "link test",
    tags: ["test1"],
  });

  const action = actions.createToolSuccess(newTool);
  const newState = toolReducer(initialState, action);

  const afterState = [
    {
      id: 0,
      title: "Test",
      description: "Another test",
      link: "link test",
      tags: ["test1"],
    },
  ];
  expect(newState).to.be.deep.equal(afterState);
  expect(newState.length).to.be.equal(1);
  expect(newState[0].title).to.be.equal("Test");
});

it("should remove tool", () => {
  const initialState = deepFreeze([
    {
      id: 0,
      title: "Test",
      description: "Another test",
      link: "link test",
      tags: ["test1", "test2", "test3"],
    },
    {
      id: 1,
      title: "Test New",
      description: "Another new test",
      link: "link for the test",
      tags: ["test1", "test4", "test2"],
    },
  ]);

  const desiredTool = deepFreeze({
    id: 0,
    title: "Test",
    description: "Another test",
    link: "link test",
    tags: ["test1", "test2", "test3"],
  });
  const action = actions.deleteToolSuccess(desiredTool);
  const newState = toolReducer(initialState, action);
  expect(newState.length).to.be.equal(1);
  expect(newState[0].title).to.be.equal("Test New");
});

it("should remove another tool", () => {
  const initialState = deepFreeze([
    {
      id: 1,
      title: "Test New",
      description: "Another new test",
      link: "link for the test",
      tags: ["test1", "test4", "test2"],
    },
  ]);

  const desiredTool = deepFreeze({
    id: 1,
    title: "Test New",
    description: "Another new test",
    link: "link for the test",
    tags: ["test1", "test4", "test2"],
  });
  const action = actions.deleteToolSuccess(desiredTool);
  const newState = toolReducer(initialState, action);
  expect(newState.length).to.be.equal(0);
});

it("should return the latest state when action is unknown", () => {
  const initialState = deepFreeze([
    {
      id: 0,
      title: "Test",
      description: "Another test",
      link: "link test",
      tags: ["test1", "test2", "test3"],
    },
    {
      id: 1,
      title: "Test New",
      description: "Another new test",
      link: "link for the test",
      tags: ["test1", "test4", "test2"],
    },
  ]);

  const action = deepFreeze({
    type: "ANYTHING",
  });
  const newState = toolReducer(initialState, action);
  expect(initialState).to.be.deep.equal(newState);
});

it("should return initial state if last state is undefined", () => {
  const lastState = undefined;
  const action = deepFreeze({});
  const afterState = initialState;
  expect(toolReducer(lastState, action)).to.be.deep.equal(afterState);
});

it("should filter the tools by the search term", () => {
  const initialState = deepFreeze([
    {
      id: 0,
      title: "Test",
      description: "Another test",
      link: "link test",
      tags: ["test1", "test2", "test3"],
    },
    {
      id: 1,
      title: "Something",
      description: "Another new test",
      link: "link for the test",
      tags: ["test1", "test4", "test2"],
    },
  ]);

  const searchTerm = "Something";
  const action = actions.loadFilteredToolsSuccess(searchTerm);
  const newState = toolReducer(initialState, action);

  const afterState = [
    {
      id: 1,
      title: "Something",
      description: "Another new test",
      link: "link for the test",
      tags: ["test1", "test4", "test2"],
    },
  ];
  expect(newState).to.be.deep.equal(afterState);
});
