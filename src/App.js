import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';

import { observer } from 'mobx-react';
import PrintedSections from './PrintedSections';
import Help from './Help';
import Preview from './Preview';
import Text from './Text';
import Columns from './Columns';
import HeadedBox from './HeadedBox';
import PathBreakdown from './PathBreakdown';
import Section from './Section';
import Header from './Header';
import Card from './Card';


import './reset'

injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    --dark-blue: hsl(220, 35%, 14%);
    --breakpoint: 740px;
    --light-gray: hsl(0,0%,97%);
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftPanel = styled.div`flex: 1 1 100%;`;
const RightPanel = styled.div`flex: 1 1 100%;`;

import svgObjectToString from './svgObjectToString';

@observer
class SvgPreview extends React.Component {
  render() {
    const { store } = this.props;

    return (
      <div>
        <Header />
        <PrintedSections store={store} />
        <Columns>
          <div last>
            {!store.isValid && <h1>INVALID</h1>}
            <Preview svg={store.displaySvgString} />
          </div>
          <div>
            <Card>
              <Section>
                <input
                  id="showStroke"
                  name="showStroke"
                  type="checkbox"
                  checked={store.showStroke}
                  onChange={store.toggleStroke}
                />
                <label htmlFor="showStroke">Show Stroke</label>
              </Section>
            </Card>
            {store.showHelp && <Help />}
            <HeadedBox heading="Current tag">
              <code>{store.currentTag}</code>
            </HeadedBox>
            {/* <code>{store.displaySvgString}</code> */}
            {store.isCurrentTagAPath && (
              <HeadedBox heading="Current path">
                <code>{store.currentTagPath.toString()}</code>
              </HeadedBox>
            )}
            {store.isCurrentTagAPath && (
              <Card>
                <Section>
                  <PathBreakdown commands={store.currentTagPathCommands} />
                </Section>
              </Card>
            )}
          </div>
        </Columns>
      </div>
    );
  }
}

SvgPreview.propTypes = {
  children: PropTypes.any
};

export default SvgPreview;
