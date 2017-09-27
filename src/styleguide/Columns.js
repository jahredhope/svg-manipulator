import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';

const Container = styled.div`@media (min-width: 740px) {display: flex;}`;

const Column = styled.div`
  @media (min-width: 740px) {
    flex-basis: 0;
    flex-grow: 1;
    padding: 0 18px;
    .columns_tight & {
      padding: 0 5px;
    }
    &:first-child {
      padding-left: 0 !important;
    }
    &:last-child {
      padding-right: 0 !important;
    }
  }
`;

export default function Columns({ children }) {
  return (
    <Container>
      {children.map((child, index) => (
        <Column key={index} style={{ order: child.props.last ? 5 : 0 }}>{child}</Column>
      ))}
    </Container>
  );
}
