import { combineReducers } from 'redux';

import route from './route.js';
import token from './token.js';

export default combineReducers({ token, route });
