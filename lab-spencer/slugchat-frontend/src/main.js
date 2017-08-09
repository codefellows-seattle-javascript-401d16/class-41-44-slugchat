import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import App from './component/app';
import {Provider} from 'react-redux';
import appStoreCreate from './lib/app-store-create.js';

let AppContainer = () => (
  <Provider store={appStoreCreate()}>
    <App />
  </Provider>
);

ReactDom.render(<AppContainer />, document.getElementById('root'));
