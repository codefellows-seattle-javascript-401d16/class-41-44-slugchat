import React from 'react';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth-action.js';
import * as route from '../../action/route-action.js';
import Landing from '../landing';
import {connect} from 'react-redux';
import {MemoryRouter, Switch, Route} from 'react-router-dom';


class App extends React.Component{

  componentDidMount(){
    let token = util.cookieFetch('X-Slugchat-Token');
    console.log('app token: ', token);
    if(token) this.props.login(token);
  }

  toggleChat(){

  }

  render(){
    return(
      <div className='app'>
        <header>
          <h2>Sluuuug Chat</h2>
          <button
            onClick={this.toggleMenu}
            className='toggle-menu'
          >
          Show Menu
          </button>
          <button
            onClick={this.toggleChat}
            className='toggle-chat'
          >
          Show Slug Chat
          </button>
        </header>
        <main className='main'>
          <Landing />
        </main>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({

});

let mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
