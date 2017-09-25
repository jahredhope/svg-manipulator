import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';

import Section from './Section';
import Card from './Card';

const Container = styled(Card)`
  min-height: 100px;
  min-width: 100px;
`;
const Heading = styled.div`
  font-size: var(--font-size-heading);
  text-align: center;
  border-bottom: var(--dividing-border);
  padding: 6px;
`;

const Content = styled.div`font-size: var(--font-size-standard);`;

export default function({ heading, children }) {
  return (
    <Container>
      <Heading>{heading}</Heading>
      <Content>
        <Section>{children}</Section>
      </Content>
    </Container>
  );
}
