import { toJS } from 'mobx';
const xmlPrint = require('xml-printer').default;

export default (svgObject) => {
  const o = toJS(svgObject);
  const result = xmlPrint(o)
  console.log('svgObjToString', result)
  return result;
}
