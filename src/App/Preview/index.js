import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PreviewContainerContainer = styled.div`
  display: block;
  position: relative;
  width: fit-content;
  background-color: var(--white);
`;

const Line = styled.div`
  position: absolute;
  opacity: 0.4;
  z-index: 1;
  background-color: var(--dark-blue);
`;

const HorLine = styled(Line)`
  height: 1px;
  width: 100%;
`;
const VertLine = styled(Line)`
  width: 1px;
  height: 100%;
`;

const PreviewContainer = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  svg {
    border: 1px solid var(--dark-blue);
    min-width: 200px;
    min-height: 200px;
    max-height: 600px;
    ${'' /* max-height: 800px; */};
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const columns = [25, 50, 75];
const rows = [25, 50, 75];

export default function Preview({ svg, showLines }) {
  return (
    <Container>
      <PreviewContainerContainer>
        {showLines &&
          columns.map(val => (
            <VertLine key={val} style={{ left: `${val}%` }} />
          ))}
        {showLines &&
          rows.map(val => <HorLine key={val} style={{ top: `${val}%` }} />)}
        <PreviewContainer dangerouslySetInnerHTML={{ __html: svg }} />
      </PreviewContainerContainer>
    </Container>
  );
}

Preview.propTypes = {
  svg: PropTypes.string.isRequired,
  showLines: PropTypes.bool.isRequired
};
