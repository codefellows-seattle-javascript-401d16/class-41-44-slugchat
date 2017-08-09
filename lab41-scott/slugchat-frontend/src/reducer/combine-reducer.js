import {combineReducers} from 'redux';
import auth from './auth-reducer.js';
import route from './route-reducer.js';

export default combineReducers({
  auth,
  route,
});
