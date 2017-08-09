import { types as userTypes } from '../user';
import types from './types.js';

const reducer = (state = null, { type, payload }) => {
  switch(type) {
  case types.SWITCH_ROUTE:
    return payload;
  case userTypes.LOGIN:
    return '/chat';
  case userTypes.LOGOUT:
    return '/landing';
  default:
    return state;
  }
};

export default reducer;
