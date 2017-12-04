import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import Store from './Store';

const store = new Store();

ReactDOM.hydrate(<App store={store} />, document.getElementById('root'));
