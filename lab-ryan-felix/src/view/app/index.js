import React from 'react';
import { connect } from 'react-redux';
import { MemoryRouter, Switch, Route } from 'react-router-dom';

import cookies from '../../lib/cookies.js';
import classToggler from '../lib/class-toggler.js';
import renderIf from '../lib/render-if.js';

import { operations as userOps } from '../../model/user';
import { operations as routeOps } from '../../model/route';

import LandingContainer from '../landing-container';
//import SignupContainer from '../signup-container';
import ChatContainer from '../chat-container';

class App extends React.Component {

  render() {
    return (
      <div className='app'>
        <header>
          <div className='toolbar'>
            <h2>Toolbar</h2>
            {renderIf(this.props.token)}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
