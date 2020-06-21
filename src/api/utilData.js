/**
 * Utility definitions for the data used in the app.
 */

//Setting a default data-style for a newTool
const newTool = {
  id: null,
  title: "",
  link: "",
  description: "",
  tags: [],
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newTool,
};
