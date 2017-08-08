import {createStore, applyMiddleware} from 'redux';
import reduxReporter from './redux-reporter.js';
import reduxThunk from './redux-thunk.js';
import combineReducer from '../reducer/combine-reducer.js';

export default () => createStore(combineReducer, applyMiddleware(reduxReporter, reduxThunk));
