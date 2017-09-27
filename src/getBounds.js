const _ = require('lodash');

export default function getBounds(ast) {
  if(!ast || !ast.commands) {
    console.error('Missing from ast', ast)
    return {};
  }
  const xValues = [];
  const yValues = [];

  ast.commands.forEach(function(command) {
    if (typeof command.params.x !== 'undefined') {
      xValues.push(command.params.x);
    }
    if (typeof command.params.y !== 'undefined') {
      yValues.push(command.params.y);
    }
  });

  return {
    left: _.min(xValues) || 0,
    right: _.max(xValues) || 0,
    top: _.min(yValues) || 0,
    bottom: _.max(yValues) || 0
  };
}
