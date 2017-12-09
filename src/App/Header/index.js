import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  min-height: 54px;
  width: 100%;
  color: white;
  padding: 12px;
  background-color: var(--dark-blue);
`;
const Title = styled.span`
  font-size: var(--font-size-standard);
`;

export default function Header() {
  return (
    <Container>
      <Title>SVG Manipulator</Title>
    </Container>
  );
}
