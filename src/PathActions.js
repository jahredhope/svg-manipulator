import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';

import arrowDown from './arrow_down.svg';
import arrowUp from './arrow_up.svg';
import arrowLeft from './arrow_left.svg';
import arrowRight from './arrow_right.svg';
import bigSquare from './square_big.svg';
import smallSquare from './square_small.svg';
import rotateLeft from './rotate_left.svg';
import rotateRight from './rotate_right.svg';

const Button = styled.button`
  display: block;
  line-height: 45px;
  padding: 0 18px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 24px);
  grid-template-rows: repeat(3, 24px);
  grid-template-areas:
  ". top ."
  "left . right"
  ". bottom ."
`;

const Icon = styled.img`
  display: block;
  height: 24px;
  width: 24px;
  cursor: pointer;
`

const UpArrow = styled(Icon)`grid-area: top;`
const DownArrow = styled(Icon)`grid-area: bottom;`
const RightArrow = styled(Icon)`grid-area: right;`
const LeftArrow = styled(Icon)`grid-area: left;`

export default function({ store }) {
  console.log('arrowDown', arrowDown);
  return (
    <ButtonGroup>
      <Grid>
        <UpArrow src={arrowUp} onClick={store.pathTranslateUp} />
        <DownArrow src={arrowDown} onClick={store.pathTranslateDown} />
        <LeftArrow src={arrowLeft} onClick={store.pathTranslateLeft} />
        <RightArrow src={arrowRight} onClick={store.pathTranslateRight} />
      </Grid>
      <Grid>
        <UpArrow src={bigSquare} onClick={store.scaleBigger} />
        <DownArrow src={smallSquare} onClick={store.scaleSmaller} />
        <LeftArrow src={rotateLeft} onClick={store.rotateLeft} />
        <RightArrow src={rotateRight} onClick={store.rotateRight} />
      </Grid>
      <Button onClick={store.simplifyPath}>Simplify</Button>
    </ButtonGroup>
  );
}
