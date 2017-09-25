import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import styled from 'styled-components';

import Store from './Store';

const ThemedApp = styled(App)`
  background-color: '#eeeeee';
  color: '#111111';
`;

const store = new Store();

ReactDOM.render(<ThemedApp store={store} />, document.getElementById('root'));
