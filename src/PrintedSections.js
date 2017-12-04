import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import 'codemirror/lib/codemirror.css';

let CodeMirror;
try {
  CodeMirror = require('react-codemirror');
  require('codemirror/mode/htmlmixed/htmlmixed');
} catch (error) {
  // Code Mirror unable to load safely, even when it is not used, such as server side rendering.
  console.error(
    'Ignoring error loading code mirror. Error likely due to browsers elements not available during import: ',
    error
  );
}

const PrintedSectionsColumn = styled.div`
  margin-bottom: 12px;
  padding-right: 6px;
`;

var options = {
  lineNumbers: true,
  mode: 'htmlmixed'
};

export default observer(function({ store, isClient }) {
  return (
    <PrintedSectionsColumn>
      {isClient && (
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
      )}
    </PrintedSectionsColumn>
  );
});
