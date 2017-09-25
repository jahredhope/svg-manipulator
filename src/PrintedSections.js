import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import { observer } from 'mobx-react';
import Card from './Card';

require('codemirror/mode/htmlmixed/htmlmixed');

var CodeMirror = require('react-codemirror');
import styles from 'codemirror/lib/codemirror.css';

console.log('styles', styles);

const PrintedSectionsColumn = styled.div`padding-right: 5px;`;

var options = {
  lineNumbers: true,
  mode: 'htmlmixed'
};

export default observer(function({ store }) {
  return (
    <PrintedSectionsColumn>
      <CodeMirror
        value={store.svgString}
        onChange={store.setSvgString}
        onCursorActivity={val => {
          store.currentCursorIndex = val.indexFromPos(val.getCursor());
        }}
        options={options}
      />
    </PrintedSectionsColumn>
  );
});
