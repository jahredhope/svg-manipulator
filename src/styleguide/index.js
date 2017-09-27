import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    --white: hsl(0, 0%, 100%);
    --dark-blue: hsl(220, 35%, 14%);
    --breakpoint: 740px;
    --light-gray: hsl(0,0%,96%);
    --font-family: Helvetica;
    --light-blue: hsl(220,80%,86%);

    --bg-color: var(--light-gray);
    --font-color: hsl(0, 0%, 5%);
    --font-size-standard: 16px;
    --font-size-heading: 21px;
    --dividing-border: 1px solid var(--gray);


    background-color: var(--bg-color);
    color: var(--font-color);
    font-size: var(--font-size-standard);
    font-family: var(--font-family);
  }
`;

export const JustifyCenter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export { default as HeadedBox } from './HeadedBox';
export { default as Card } from './Card';
export { default as Columns } from './Columns';
export { default as Section } from './Section';
export { default as Text } from './Text';
