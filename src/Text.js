import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';

export default styled.span`
  color: var(--font-color);
  font-size: ${({heading}) => heading ? 'var(--font-size-standard)' : 'var(--font-size-heading)'}
`
