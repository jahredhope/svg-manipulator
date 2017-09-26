import { observable, computed, action } from 'mobx';
import XmlReader from 'xml-reader';
import { parse as parsePath, stringify as stringifyPath } from 'path-ast';

import stripParent from './stripParent';

function simplifyPathAst(ast, level) {
  ast.commands.forEach(command => {
    if(command.params) {
      Object.keys(command.params).forEach(key => {
        command.params[key] = Math.round(command.params[key]*level)/level
      })
    }
  })
}

function createFromString(stringValue) {
  const obj = XmlReader.parseSync(stringValue);
  return stripParent(obj);
}
const svgString = `<svg viewbox="0 0 24 24">
  <circle cx="6" cy="5" r="4" fill="blue" />
  <path d="M20 20 L 5 20 L 5 10 Z" fill="orange" />
  <path d="M10 10 H 18 V 22 H 18 Z" fill="yellow" />
  <rect x="9" y="3" width="6" height="12" fill="green" />
</svg>`;

function addStroke(val) {
  const parent = document.createElement('svg');
  try {
    parent.innerHTML = val;
    parent.children[0].setAttribute('stroke', 'red');
    const currentStyleAtt = parent.children[0].getAttribute('style');
    parent.children[0].setAttribute('style', currentStyleAtt + ';stroke:red;');
  } catch (e) {
    console.error('Error With XML', e);
    return val;
  }
  return parent.innerHTML;
}

const svgObject = createFromString(svgString);

const oParser = new DOMParser();

export default class SvgStore {
  constructor() {
    this.svgString = svgString;
    this.svgObject = observable(svgObject);
  }

  @observable showHelp = false;
  @observable showStroke = true;
  @observable showLines = true;
  @observable currentCursorIndex = -1;
  @observable svgString = '';
  @observable simplifyOnTransform = true;

  @computed
  get isValid() {
    const doc = oParser.parseFromString(this.svgString, 'image/svg+xml');
    const failed = doc.documentElement.innerHTML.indexOf('<parsererror') > -1;
    return !failed;
  }
  @computed
  get displaySvgString() {
    if (!this.currentTag) {
      return this.svgString;
    }
    if (!this.showStroke) {
      return this.svgString;
    }
    let val =
      this.beforeCurrentTag +
      this.currentTag +
      addStroke(this.currentTag) +
      this.afterCurrentTag;
    return val;
  }
  @computed
  get showCommands() {
    return this.isCurrentTagAPath;
  }
  @computed
  get beforeCurrentTag() {
    return this.svgString.substring(0, this.currentTagStart);
  }
  @computed
  get afterCurrentTag() {
    return this.svgString.substring(this.currentTagEnd);
  }
  @computed
  get currentTag() {
    if (
      this.currentCursorIndex < 0 ||
      this.currentTagStart === 0 ||
      this.currentTagEnd === 0
    ) {
      return '';
    }
    const val = this.svgString.substring(
      this.currentTagStart,
      this.currentTagEnd
    );
    return val;
  }
  @computed
  get isCurrentTagAPath() {
    return /^<path/i.test(this.currentTag);
  }
  @computed
  get currentTagPath() {
    if (!this.isCurrentTagAPath) {
      return '';
    }
    try {
      const obj = XmlReader.parseSync(this.currentTag);
      const pathString = obj.attributes.d;
      return pathString;
    } catch (error) {
      console.error('An error when parsing xml', error);
    }
  }
  @computed
  get currentTagPathCommands() {
    if (!this.isCurrentTagAPath) {
      return undefined;
    }
    try {
      const obj = XmlReader.parseSync(this.currentTag);
      const pathString = obj.attributes.d;
      // console.log('obj', obj);
      if (!pathString) {
        return [];
      }
      const ast = parsePath(pathString);
      // console.log('ast', ast);
      return ast.commands;
    } catch (error) {
      console.error(
        'An error occured when parsing xml in currentTagPathCommands',
        error
      );
      return [];
    }
  }
  @computed
  get currentTagStart() {
    return this.svgString.lastIndexOf('<', this.currentCursorIndex);
  }
  @computed
  get currentTagEnd() {
    console.log('svgString', svgString.length);
    return this.svgString.indexOf('>', this.currentCursorIndex) + 1;
  }
  @action.bound
  toggleStroke() {
    this.showStroke = !this.showStroke;
  }
  @action.bound
  toggleLines() {
    this.showLines = !this.showLines;
  }
  @action.bound
  setSvgString(val) {
    this.svgString = val;
  }
  scalePath = val => {
    const ast = parsePath(this.currentTagPath);
    ast.scale(val);
    this.simplifyOnTransform && simplifyPathAst(ast, this.simplifycationLevel)
    this.replaceCurrentPath(stringifyPath(ast));
  };
  @action.bound
  replaceCurrentPath(newPath) {
    const currentTagPath = this.currentTagPath;
    const currentTag = this.currentTag;

    const newCurrentTag = currentTag.replace(
      `"${currentTagPath}"`,
      `"${newPath}"`
    );
    this.svgString =
      this.beforeCurrentTag + newCurrentTag + this.afterCurrentTag;
  }
  scaleBigger = () => {
    this.scalePath(1.1);
  };
  scaleSmaller = () => {
    this.scalePath(0.9);
  };
  rotatePath = val => {
    const ast = parsePath(this.currentTagPath);
    ast.rotate(val);
    this.simplifyOnTransform && simplifyPathAst(ast, this.simplifycationLevel)
    this.replaceCurrentPath(stringifyPath(ast));
  };

  rotateLeft = () => {
    this.rotatePath(-15);
  };
  rotateRight = () => {
    this.rotatePath(15);
  };
  pathTranslate = (x, y) => {
    const ast = parsePath(this.currentTagPath);
    ast.translate(x, y);
    this.simplifyOnTransform && simplifyPathAst(ast, this.simplifycationLevel)
    this.replaceCurrentPath(stringifyPath(ast));
  };

  pathTranslateLeft = () => {
    this.pathTranslate(-1, 0);
  };
  pathTranslateRight = () => {
    this.pathTranslate(1, 0);
  };
  pathTranslateUp = () => {
    this.pathTranslate(0, -1);
  };
  pathTranslateDown = () => {
    this.pathTranslate(0, 1);
  };
  @observable
  simplifycationLevel = 100;
  simplifyPath = () => {
    const ast = parsePath(this.currentTagPath);
    simplifyPathAst(ast, this.simplifycationLevel)
    this.replaceCurrentPath(stringifyPath(ast));
  };
  @action.bound
  toggleSimplifyOnTransform() {
    this.simplifyOnTransform = !this.simplifyOnTransform
  }
}
