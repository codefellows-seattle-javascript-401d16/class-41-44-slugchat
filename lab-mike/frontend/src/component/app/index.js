import React from 'react';
import {connect} from 'react-redux';
import {MemoryRouter, Switch, Route} from 'react-router-dom';
import * as route from '../../action/route.js';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth.js';

import LandingContainer from '../landing-container';

class App extends React.Component {
  componentDidMount() {
    let token = util.cookieFetch('X-Slugchat-Token');
    if(token)
      this.props.login(token);
  }
  render () {
    return (
      <div className='app'>
        <header>
        </header>
        <MemoryRouter>
          <Switch location={{pathname: this.props.route}}>
            <Route path='/' component={LandingContainer} />
            <Route path='/chat' component={() => <p>Chat</p>} />
          </Switch>
        </MemoryRouter>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  token: state.token,
  route: state.route,
});

let mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(auth.logout()),
  login: (token) => dispatch(auth.login(token)),
  goToChat: () => dispatch(route.switchRoute('/chat')),
  goToSettings: () => dispatch(route.switchRoute('/settings')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
