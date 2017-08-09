import React from 'react';
import {connect} from 'react-redux';
import {MemoryRouter, Switch, Router} from 'react-router-dom';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth.js';
import * as route from '../../action/route.js';

import LandingContainer from '../landing-container';
import SignupContainer from '../signup-container';

class App extends React.Component {
  componentDidMount() {
    let token = util.cookieFetch('X-Slugchat-Token');
    if(token)
      this.props.login(token);
  }
  render () {
    return (
      <div className='app'>
        <MemoryRouter>
          <Switch location={{pathname: this.props.route}}>
            <Route path='/landing' component={LandingContainer} />
            <Route path='/chat' component={() => <p>Chat</p>} />
          </Switch>
        </MemoryRouter>
      </div>
    );
  }
}
