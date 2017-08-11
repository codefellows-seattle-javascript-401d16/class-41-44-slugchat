import React from 'react';
import {connect} from 'react-redux';
import {MemoryRouter,Switch, Route} from 'react-router-dom';
import {renderIf,cookieFetch,classToggler} from '../../lib/util.js';
import * as auth from '../../action/auth.js';
import * as route from '../../action/route.js';

import './_app.scss';
import ChatContainer from '../chat-container';
import LandingContainer from '../landing-container';
import SignupContainer from '../signup-container';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: true,
      showChat: true,
    };

    this.toggleChat = this.toggleChat.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount(){
    let token = cookieFetch('X-Slugchat-Token');
    if(token)
      this.props.login(token);
  }

  toggleChat(e) {
    this.state.showChat ? this.setState({showChat: false}) : this.setState({showChat: true});
  }

  toggleMenu(e) {
    this.state.showMenu ? this.setState({showMenu: false}) : this.setState({showMenu: true});
  }

  render(){
    let toggleClassChat = classToggler({
      'toggle-chat': true,
      'hide': this.state.showChat,
    });

    let toggleClassMenu = classToggler({
      'logo': true,
      'hide': this.state.showMenu,
    });

    return (
      <div className='app'>
        <header>
          <div className='toolbar'>
            <button
              className='toggle-chat'
              onClick={this.toggleChat}>
              Show/Hide Chat
            </button>

            <button
              className='logo'
              onClick={this.toggleMenu}>
              Menu
            </button>

          </div>
          {renderIf(this.props.token,
            <div className={toggleClassMenu}>
              <button onClick={this.props.goToChat}> chat </button>
              <button onClick={this.props.goToSettings}> settings </button>
              <button onClick={this.props.logout}> logout </button>
            </div>
          )}
        </header>
        <div className={toggleClassChat}>
          <MemoryRouter>
            <Switch location={{pathname: this.props.route}}>
              <Route path='/landing' component={LandingContainer} />
              <Route path='/chat' component={ChatContainer} />
              <Route path='/signup' component={SignupContainer} />
              <Route path='/login' component={() => <p> login</p>} />
              <Route path='/settings' component={() => <p> settings</p>} />
            </Switch>
          </MemoryRouter>
        </div>
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
