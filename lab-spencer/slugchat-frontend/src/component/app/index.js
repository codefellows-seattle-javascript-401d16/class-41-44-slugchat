import React from 'react';
import {connect} from 'react-redux';
import {MemoryRouter, Switch, Route} from 'react-router-dom';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth.js';

import Landing from '../landing';
import Chat from '../chat';

class App extends React.Component {

  componentWillMount() {
    let token = util.readCookie('X-Slugchat-Token');
    if(token)
      this.props.login(token);
  }

  return (
    <main>
      <header>
        <h1>Slugchat</h1>
        <button onClick={this.props.goToLanding}>Home</button><button onClick={this.props.goToChat}>Chat</button>
      </header>
      <MemoryRouter>
        <Switch location={{ pathname: this.props.route }}>
          <Route path='/landing' component={Landing} />
          <Route path='/chat' component={() => <p>Chat page</p>} />
        </Switch>
      </MemoryRouter>
    </main>
  );
}

const mapStateToProps = state => ({
  token: state.token,
  route: state.route,
});

const mapDispatchToProps = dispatch => ({
  login: token => dispatch(auth.login(token)),
  logout: () => dispatch(auth.logout()),
  goToLanding: () => dispatch(route.switchRoute('/landing')),
  goToChat: () => dispatch(route.switchRoute('/chat')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
