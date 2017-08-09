import types from './types.js';

const reducer = (state = null, { type, payload }) => {
  switch(type) {
  case types.LOGIN:
    return payload;
  case types.LOGOUT:
    return null;
  default:
    return state;
  }
};

export default reducer;
