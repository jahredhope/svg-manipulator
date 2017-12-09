export default function stripParent(node) {
  if (Array.isArray(node)) {
    return node.map(stripParent);
  }
  if (typeof node !== 'object') {
    return node;
  }
  node.parent = undefined;
  delete node.parent;
  Object.keys(node).forEach(child => {
    node[child] = stripParent(node[child]);
  });
  return node;
}
