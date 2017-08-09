import superagent from 'superagent';

import cookies from '../lib/cookies.js';
import { log, error } from '../../lib/loggers.js';

import actions from './actions.js';

const logout = actions.logout;

const requestLogin = user => dispatch => {
  return superagent.get(`${__API_URI__}/login`)
    .withCredentials()
    .auth(user.username, user.password)
    .then(res => {
      const token = cookies.read('X-Slugchat-Token');
      if(token) {
        dispatch(actions.login(token));
      }
      return res;
    })
    .catch(error);
};

const requestSignup = user => dispatch => {
  return superagent.post(`${__API_URI__}/signup`)
    .withCredentials()
    .send(user)
    .then(res => {
      const token = cookies.read('X-Slugchat-Token');
      if(token) {
        dispatch(actions.login(token));
      }
      return res;
    })
    .catch(error);
};

export default {
  logout,
  requestLogin,
  requestSignup,
};
