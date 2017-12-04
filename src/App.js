import React from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';
import PrintedSections from './PrintedSections';
import Help from './Help';
import Preview from './Preview';
import PathBreakdown from './PathBreakdown';
import Header from './Header';
import PathActions from './PathActions';
import styled from 'styled-components';

import { JustifyCenter, Columns, Card, Section, HeadedBox } from './styleguide';

import './reset';

const ThemedApp = styled.div`
  background-color: '#eeeeee';
  color: '#111111';
`;

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClient: false
    };
  }
  componentDidMount() {
    this.setState({
      isClient: true
    });
  }
  static propTypes = {
    store: PropTypes.object.isRequired
  };
  render() {
    const { store } = this.props;
    const { isClient } = this.state;

    return (
      <ThemedApp>
        <Header />
        <PrintedSections isClient={isClient} store={store} />
        <Columns>
          <div last>
            {!store.isValid && <h1>INVALID</h1>}
            <Preview svg={store.displaySvgString} showLines={store.showLines} />
            {store.showCommands && (
              <JustifyCenter>
                <PathActions store={store} />
              </JustifyCenter>
            )}
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
                  id="showBounds"
                  name="showBounds"
                  type="checkbox"
                  checked={store.showBounds}
                  onChange={store.toggleBounds}
                />
                <label htmlFor="showBounds">Show Bounds</label>
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
              <Section>
                <input
                  id="simplifyOnTransform"
                  name="simplifyOnTransform"
                  type="checkbox"
                  checked={store.simplifyOnTransform}
                  onChange={store.toggleSimplifyOnTransform}
                />
                <label htmlFor="simplifyOnTransform">Simplify On Transform</label>
              </Section>
            </Card>
            {store.showHelp && <Help />}
            {store.currentTag && (
              <HeadedBox heading="Current tag">
                <Section>
                  <code>{store.currentTag}</code>
                </Section>
              </HeadedBox>
            )}
            {store.isCurrentTagAPath && (
              <HeadedBox heading="Current path">
                <Section>
                  <code>{store.currentTagPath}</code>
                  {/* <input
                    type="text"
                    value={store.currentTagPath}
                    onChange={event =>
                      store.replaceCurrentPath(event.target.value)}
                  /> */}
                </Section>
                <Section>
                  <div>Left: {store.currentTagBounds.left}</div>
                  <div>Right: {store.currentTagBounds.right}</div>
                  <div>Top: {store.currentTagBounds.top}</div>
                  <div>Bottom: {store.currentTagBounds.bottom}</div>
                </Section>
              </HeadedBox>
            )}
            {store.isCurrentTagAPath && (
              <Card>
                <HeadedBox heading="Path breakdown">
                  <Section>
                    <PathBreakdown commands={store.currentTagPathCommands} />
                  </Section>
                </HeadedBox>
              </Card>
            )}
          </div>
        </Columns>
      </ThemedApp>
    );
  }
}
