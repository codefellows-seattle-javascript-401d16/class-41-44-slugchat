import superagent from 'superagent';
import * as util from '../lib/util.js';

export const signIn = token => ({
  type: 'SIGNIN',
  payload: token,
});

export const signOut = () => {
  util.cookieDelete('X-Slugchat-Token');
  return { type: 'SIGNOUT' };
};

export const signInRequest = user => dispatch =>
  superagent.get(`${__API_URL__}/login`)
    .withCredentials()
    .auth(user.username, user.password)
    .then(res => {
      let token = util.cookieFetch('X-Slugchat-Token');
      if(token)
        dispatch(signIn(token));
      return res;
    })
    .catch(util.logError);

export const signUpRequest = user => dispatch =>
  superagent.post(`${API_URL}/signup`)
    .withCredentials()
    .send(user)
    .then(res => {
      let token = util.cookieFetch('X-Slugchat-Token');
      if(token)
        dispatch(login(token));
      return res;
    })
    .catch(util.logError);
