import React from 'react';

class LandingContainer extends React.Component {

  constructor(props) {
    super(props);
    this.loginURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${__GOOGLE_CLIENT_ID__}&redirect_uri=http://${__API_URI__}/oauth/google/code&scope=https://www.googleapis.com/auth/plus.me&state=abc123`;
  }

  render() {
    return (
      <div>
        <h2>Landing</h2>
        <a href={this.loginURL}>
          Login with Google
        </a>
      </div>
    );
  }

}

export default LandingContainer;
