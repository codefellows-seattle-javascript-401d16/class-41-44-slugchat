import React from 'react';
import * as querystring from 'querystring';
import { connect } from 'react-redux';
import * as route from '../../action/route.js';

class LandingContainer extends React.Component {
  render() {
    const googleLoginBaseURL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const googleLoginQuery = querystring.stringify({
      client_id: __GOOGLE_CLIENT_ID__,
      response_type: 'code',
      redirect_uri: `${__API_URL__}/oauth/google/code`,
      scope: 'openid profile email',
      prompt: __DEBUG__ ? 'consent' : undefined,
    });

    const googleLoginURL = `${googleLoginBaseURL}?${googleLoginQuery}`;
    return (
      <div className="landing-container">
        <button onClick={this.props.goToLogin}> login </button>
        <button onClick={this.props.goToSignup}> signup </button>
        <a href={googleLoginURL} > login with google </a>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
});

export const mapDispatchToProps = dispatch => ({
  goToLogin: () => dispatch(route.switchRoute('/login')),
  goToSignup: () => dispatch(route.switchRoute('/signup')),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
