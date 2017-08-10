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
    type: 'LOGOUT',
    payload: null,
  };
};

//async actions
export const signupRequest = (userData) => (dispatch) => {
  return superagent.post(`${__API_URL__}/signup`)
    .withCredentials() //this lets us exchange cookies.
    .send(userData)
    .then(res => {
      let token = util.cookieFetch('X-Slugchat-Token');
      if(token) dispatch(login(token));
      return res;
    })
    .catch(console.error);
};

export const loginRequest = (userData) => (dispatch) => {
  return superagent.get(`${__API_URL__}/login`)
    .withCredentials()
    .auth(userData.username, userData.password)
    .then(res => {
      console.log('login res: ', res);
      let token = util.cookieFetch('X-Slugchat-Token');
      if(token) dispatch(login(token));
      return res;
    })
    .catch(console.error);
};
