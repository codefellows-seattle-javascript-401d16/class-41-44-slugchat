import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import App from './component/app';
import {Provider} from 'react-redux';
import appStoreCreate from './lib/app-store-create.js';
import io from './lib/io.js';

import userSubscribers from './subscribe/user.js';
import messageSubscribers from './subscribe/message.js';

const store = appStoreCreate();

let subscribers = Object.assign(userSubscribers, messageSubscribers);
io(store, subscribers);

let AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDom.render(<AppContainer />, document.getElementById('root'));
