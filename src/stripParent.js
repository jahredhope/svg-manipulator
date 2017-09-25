
export default function stripParent(node) {
  // console.log('stripParent');
  if (Array.isArray(node)) {
    return node.map(stripParent);
  }
  if (typeof node !== 'object') {
    return node;
  }
  // console.log('clear parent');
  node.parent = undefined;
  delete node.parent;
  Object.keys(node).forEach(child => {
    node[child] = stripParent(node[child]);
  });
  return node;
}
