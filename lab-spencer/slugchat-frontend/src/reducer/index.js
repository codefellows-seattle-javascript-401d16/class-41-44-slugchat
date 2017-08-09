import {combineReducers} from 'redux';

import token from './auth.js';
import route from './route.js';

export default combineReducers({token, route});
