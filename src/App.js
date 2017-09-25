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

import './reset';

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

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftPanel = styled.div`flex: 1 1 100%;`;
const RightPanel = styled.div`flex: 1 1 100%;`;

import svgObjectToString from './svgObjectToString';

@observer
class App extends React.Component {
  render() {
    const { store } = this.props;

    return (
      <div>
        <Header />
        <PrintedSections store={store} />
        <Columns>
          <div last>
            {!store.isValid && <h1>INVALID</h1>}
            <Preview svg={store.displaySvgString} showLines={store.showLines} />
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
              <Section>
                <input
                  id="showLines"
                  name="showLines"
                  type="checkbox"
                  checked={store.showLines}
                  onChange={store.toggleLines}
                />
                <label htmlFor="showLines">Show Lines</label>
              </Section>
            </Card>
            {store.showHelp && <Help />}
            {store.currentTag && (
              <HeadedBox heading="Current tag">
                <code>{store.currentTag}</code>
              </HeadedBox>
            )}
            {/* <code>{store.displaySvgString}</code> */}
            {store.isCurrentTagAPath && (
              <HeadedBox heading="Current path">
                <code>{store.currentTagPath}</code>
              </HeadedBox>
            )}
            {store.isCurrentTagAPath && (
              <Card>
                <HeadedBox heading="Path breakdown">
                  <PathBreakdown commands={store.currentTagPathCommands} />
                </HeadedBox>
              </Card>
            )}
          </div>
        </Columns>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.any
};

export default App;
