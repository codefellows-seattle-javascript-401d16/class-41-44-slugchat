let AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
let CLIENT_ID =
  'client_id=597096876532-5nt0h18sa5mln9uupmt287jg926p123i.apps.googleusercontent.com';
let responseType = 'response_type=code';
let scope = 'scope=openid%20profile%20email';
let promptQuery = 'prompt=consent';
let redirectURIQuery = 'redirect_uri=http://localhost:3000/oauth/google/code';

let formatedAuthURL = `${AUTH_URL}?${CLIENT_ID}&${responseType}&${scope}&${promptQuery}&${redirectURIQuery}`;

import React from 'react';
import { connect } from 'react-redux';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import * as querystring from 'querystring';

import LandingContainer from '../landing-container';

class App extends React.Component {
  render() {

    });
  }
}
