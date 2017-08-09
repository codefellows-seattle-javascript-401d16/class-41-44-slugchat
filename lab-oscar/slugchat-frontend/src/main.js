import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import storeCreate from './lib/store-create';
import App from './component/app';

let AppContainer = () => (
  <Provider store={storeCreate()}>
    <App />
  </Provider>
);

ReactDom.render( <AppContainer/> , document.getElementById('root'));
