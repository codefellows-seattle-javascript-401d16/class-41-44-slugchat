import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import * as util from './lib/util.js';

const App = () => {
  let token = util.readCookie('X-Sluggram-Token');
  const googParams = {
    AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientIDQuery: process.env.GOOGLE_CLIENT_ID,
    responseTypeQuery: 'response_type=code',
    scopeQuery: 'scope=openid%20profile%20email',
    // promptQuery: 'promp=consent',
    redirectURIQuery: 'redirect_uri=http://localhost:3000/oauth/google/code',
  };
  const formattedUrl = `${googParams.AUTH_URL}?${googParams.clientIDQuery}&${googParams.responseTypeQuery}&${googParams.scopeQuery}&${googParams.redirectURIQuery}`;

  return (
    <div className='login-container'>
      util.renderIf(token,
      <h1>Woo! You are logged in!</h1>
      )
      util.renderIf(!token,
      <h1>You are not logged in!</h1>
      <a href={formattedUrl}>Sign in with google!</a>
      )
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
