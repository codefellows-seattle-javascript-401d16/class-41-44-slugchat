import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './component/app';
import storeCreate from './lib/store-create.js';

const AppContainer = () => (
  <Provider store={storeCreate()}>
    <App />
  </Provider>
);

ReactDom.render(<AppContainer />, document.getElementById('root'));
