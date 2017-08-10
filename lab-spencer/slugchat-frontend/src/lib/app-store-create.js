import reducer from '../reducer';
import thunk from './redux-thunk.js';
import reporter from './redux-reporter.js';
import {createStore, applyMiddleware} from 'redux';
import {reduxIO} from './io.js';

export default () => createStore(reducer, applyMiddleware(reduxIO, thunk, reporter));
