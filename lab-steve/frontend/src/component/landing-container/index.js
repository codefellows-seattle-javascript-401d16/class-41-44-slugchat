import React from 'react';
import {connect} from 'react-redux';
import * as route from '../../action/route.js';
import * as querystring from 'querystring';

export class LandingContainer extends React.Component {
  render() {
    let googleLoginQuery = querystring.stringify({
      client_id: __GOOGLE_CLIENT_ID__,
      response_type: 'code',
      redirect_uri: `${__API_URL__}/oauth/google/code`,
      scope: 'openid profile email',
      prompt: __DEBUG__ ? 'content' : undefined,
    });

    let googleLoginURL = `${__OAUTH_API__}?${googleLoginQuery}`
    return (
      <div className='landing-container'>
        <button onClick={this.props.goToLogin}> login </button>
        <button onClick={this.props.goToSignup}> signup </button>
        <a href={googleLoginURL} > login with google </a>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
});
