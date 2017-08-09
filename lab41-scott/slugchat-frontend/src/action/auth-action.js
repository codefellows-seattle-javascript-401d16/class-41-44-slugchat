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
  console.log('user Data: ', userData);

  return superagent.post(`${__API_URL__}/signup`)
    .withCredentials() //this lets us exchange cookies.
    .send(userData)
    .then(res => {
      console.log('SU res: ', res);
      let token = util.cookieFetch('X-Slugchat-Token');
      if(token) dispatch(login(token));
      return res;
    })
    .catch(console.error);
};
