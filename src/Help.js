import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import { observer } from 'mobx-react';

const svgExamples = {
  circle: `<circle cx="" cy="" r="" />`,
  path: `<path d="" />`
}

const CodeExample = styled.code`
  display: block;
  padding: 6px 0;
`

export default observer(function() {
  return (
    <div>
      {Object.values(svgExamples).map((value) => <CodeExample key={value}>{value}</CodeExample>)}
    </div>
  );
})
