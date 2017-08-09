import React from 'react';
import {connect} from 'redux';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const googParams = {
      AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
      clientIDQuery: `client_id=1045810800574-idcq9cgc3t1uf9om5l8uqo5fm0tr8ioe.apps.googleusercontent.com`,
      responseTypeQuery: 'response_type=code',
      scopeQuery: 'scope=openid%20profile%20email',
      // promptQuery: 'promp=consent',
      redirectURIQuery: 'redirect_uri=http://localhost:3000/oauth/google/code',
    };
    const formattedUrl = `${googParams.AUTH_URL}?${googParams.clientIDQuery}&${googParams.responseTypeQuery}&${googParams.scopeQuery}&${googParams.redirectURIQuery}`;

    <div className='login-container'>
      {util.renderIf(token,
        <div>
          <h1>Woo! You are logged in!</h1>
          <button onClick={handleSignOut}>Sign Out</button>
      )}
      {util.renderIf(!token,
        <div>
          <h1>You are not signed in!</h1>
          <a href={formattedUrl}>Sign in with google!</a>
        </div>
      )}
    </div>
  }
}

const mapStateToProps = state => ({
  route: state.route,
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  login: token => dispatch(auth.login(token)),
  logout: () => dispatch(auth.logout()),
  goToLanding: () => dispatch(route.switchRoute('/landing')),
  goToChat: () => dispatch(route.switchRoute('/chat')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
