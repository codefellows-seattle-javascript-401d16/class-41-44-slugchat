import types from './types.js';

const switchRoute = path => ({
  type: types.SWITCH_ROUTE,
  payload: path,
});
