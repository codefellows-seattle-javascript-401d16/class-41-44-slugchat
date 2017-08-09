import types from './types.js';
import cookies from '../../lib/cookies.js';

const login = token => ({
  type: types.LOGIN,
  payload: token,
});

const logout = () => {
  cookies.remove('X-Slugchat-Token');
  return {
    type: types.LOGOUT,
  };
};

export default {
  login,
  logout,
};
