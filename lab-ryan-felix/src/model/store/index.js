import { createStore, applyMiddleware, combineReducers } from 'redux';

import thunk from '../lib/redux-thunk.js';

import userReducer from '../user';
import routeReducer from '../route';

export default () => createStore(combineReducers({ userReducer, routeReducer }), applyMiddleware(thunk));
