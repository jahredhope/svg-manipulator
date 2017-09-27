import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import md5 from 'md5';

import { observer } from 'mobx-react';

const getHue = keyString => {
  const hash = md5(keyString.toString()).substr(0, 8);
  const hashAsInt = parseInt('0x' + hash, 16);

  return hashAsInt % 255;
};

const Param = styled.div`
  padding: 0 5px;
  min-width: 80px;
`;

const ParamValue = styled.code`color: black;`;
const ParamKey = styled.label`
  color: ${({ keyString }) => `hsl(${getHue(keyString)}, 50%, 50%)`};
`;

const Command = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 3px 6px 6px 0;
`;

const CommandLabel = styled.div`
  min-width: 50px;
  display: inline-block;
`

@observer
export default class PathBreakdown extends Component {
  render() {
    const { commands = [] } = this.props;
    return (
      <div>
        {commands.map(({ type, params }, index) => (
          <Command key={index}>
            <CommandLabel>{type}</CommandLabel>
            {Object.entries(params).map(([key, value], index) => (
              <Param key={index}>
                <ParamKey keyString={key}>{key}</ParamKey>=
                {/* <input type="text" value={value} /> */}
                <ParamValue>{value}</ParamValue>
              </Param>
            ))}
          </Command>
        ))}
      </div>
    );
  }
}
