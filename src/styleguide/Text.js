import styled from 'styled-components';

export default styled.span`
  color: var(--font-color);
  font-size: ${({ heading }) =>
    heading ? 'var(--font-size-standard)' : 'var(--font-size-heading)'};
`;
