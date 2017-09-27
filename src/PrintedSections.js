import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import { observer } from 'mobx-react';
import {Card} from './styleguide';

require('codemirror/mode/htmlmixed/htmlmixed');

import CodeMirror from 'react-codemirror';
// import CodeMirror from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';

const PrintedSectionsColumn = styled.div`
  margin-bottom: 12px;
  padding-right: 6px;
`;

var options = {
  lineNumbers: true,
  mode: 'htmlmixed'
};

export default observer(function({ store }) {
  return (
    <PrintedSectionsColumn>
      <CodeMirror
        value={store.svgString}
        autoSave={true}
        onChange={store.setSvgString}
        onViewportChange={() => console.log('onViewportChange called')}
        onCursorActivity={val => {
          store.currentCursorIndex = val.indexFromPos(val.getCursor());
        }}
        options={options}
      />
    </PrintedSectionsColumn>
  );
});
