import React from 'react';
import * as querystring from 'querystring';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as route from '../../action/route.js';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

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
        <MuiThemeProvider>
          <Paper style={style}>
            <Menu>
              <MenuItem onClick={this.props.goToLogin} primaryText="login" />
              <MenuItem onClick={this.props.goToSignup} primaryText="signup" />
              <MenuItem primaryText="login with google" href={googleLoginURL} alt="google login" />
            </Menu>
          </Paper>
        </MuiThemeProvider>
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
