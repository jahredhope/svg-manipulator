import React from 'react';
import styled from 'styled-components';

const svgExamples = {
  circle: `<circle cx="" cy="" r="" />`,
  path: `<path d="" />`
};

const CodeExample = styled.code`
  display: block;
  padding: 6px 0;
`;

export default function Help() {
  return (
    <div>
      {Object.values(svgExamples).map(value => (
        <CodeExample key={value}>{value}</CodeExample>
      ))}
    </div>
  );
}
