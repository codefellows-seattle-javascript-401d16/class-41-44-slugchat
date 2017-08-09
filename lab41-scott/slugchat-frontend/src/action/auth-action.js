//actions for login logout and signup
import superagent from 'superagent';
import * as util from '../lib/util.js';

export const login = (token) => ({
  type: 'LOGIN',
  payload: token,
});

export const logout = () => {
  util.cookieDelete('X-Slugchat-Token');
  return {
    type: 'LOGIN',
  };
};

//async actions
