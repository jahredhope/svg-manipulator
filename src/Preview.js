import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';

const PreviewContainerContainer = styled.div`
  display: block;
  position: relative;
  width: fit-content;
`;

const HorLine = styled.div`
  position: absolute;
  z-index: -1;
  height: 1px;
  width: 100%;
  background-color: gray;
`;
const VertLine = styled.div`
  position: absolute;
  z-index: -1;
  width: 1px;
  height: 100%;
  background-color: gray;
`;

const PreviewContainer = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  svg {
    border: 1px solid red;
    min-width: 200px;
    min-height: 200px;
    max-height: 600px;
    ${'' /* max-height: 800px; */}
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`
const columns = [25, 50, 75];
const rows = [25, 50, 75];

export default function({svg}) {
  return (
    <Container>
    <PreviewContainerContainer>
      {columns.map(val => <VertLine style={{ left: `${val}%` }} />)}
      {rows.map(val => <HorLine style={{ top: `${val}%` }} />)}
      <PreviewContainer
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </PreviewContainerContainer>
    </Container>
  );
}
