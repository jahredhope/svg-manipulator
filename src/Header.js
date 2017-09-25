import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  min-height: 54px;
  width: 100%;
  color: white;
  padding: 12px;
  background-color: var(--dark-blue);
`
const Title = styled.span`
  font-size: --font-size-heading;
`

export default function() {
  return <Container>
    <Title>SVG Manipulator</Title>
  </Container>
}
