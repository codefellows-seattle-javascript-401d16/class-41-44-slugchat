import { createStore, applyMiddleware, combineReducers } from 'redux';

import thunk from '../lib/redux-thunk.js';

import userReducer from '../user';

export default () => createStore(userReducer, applyMiddleware(thunk));
