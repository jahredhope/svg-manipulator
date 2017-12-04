global.__SERVER_RENDER = true;
// Mock navigator for CodeMirror
// global.navigator = global.navigator || {};
global.window = global;
// window.navigator = window.navigator || {};
// window.document = window.document || {
//   querySelectorAll: () => {},
//   createElement: () => ({
//     setAttribute: () => {},
//     childNodes: []
//   })
// };

/* eslint-disable import/first */

import React from 'react';
import ReactDOMServer from 'react-dom/server';

const App = require('./App').default;
// import App from './App';
import Store from './Store';

const store = new Store();

import { ServerStyleSheet } from 'styled-components';

function template({ css, js, ...rest }) {
  console.log('Rendering', 'css', css);
  console.log('Rendering', 'js', js);
  const sheet = new ServerStyleSheet();
  const appHtml = ReactDOMServer.renderToString(sheet.collectStyles(<App store={store} />));
  // const appHtml = ReactDOMServer.renderToString(sheet.collectStyles(<App store={store} />));
  const styleTags = sheet.getStyleTags();
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="shortcut icon" href="/favicon.ico">
      ${css.map(fileName => `<link rel="stylesheet" href="${fileName}" />`).join('\n')}
      <title>React App</title>
      ${styleTags}
    </head>
    <body>
      <div id="root">${appHtml}</div>
      ${js.map(fileName => `<script src="${fileName}"></script>`).join('\n')}
    </body>
  </html>

  `;
}

export default data => {
  const entryPointToRender = data.webpackStats.compilation.entrypoints.index;
  const entryPointToRenderVendor = data.webpackStats.compilation.entrypoints.vendor;
  const jsFilesToRender = []
    .concat(
      ...[
        ...entryPointToRenderVendor.chunks.map(({ files }) => files),
        ...entryPointToRender.chunks.map(({ files }) => files)
      ]
    )
    .filter(file => file.match(/\.js$/));
  const cssFilesToRender = []
    .concat(...entryPointToRender.chunks.map(({ files }) => files))
    .filter(file => file.match(/\.css$/));

  return template({ css: cssFilesToRender, js: jsFilesToRender, ...data });
};
