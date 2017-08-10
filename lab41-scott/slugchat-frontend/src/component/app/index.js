import React from 'react';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth-action.js';
import * as route from '../../action/route-action.js';
import Landing from '../landing';
import SignupForm from '../signup-form';
import LoginForm from '../login-form';
import {connect} from 'react-redux';
import {MemoryRouter, Switch, Route} from 'react-router-dom';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      toggleChat: false,
      toggleMenu: false,
    };

    this.toggleChat = this.toggleChat.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount(){
    let token = util.cookieFetch('X-Slugchat-Token');
    console.log('app token: ', token);
    if(token)this.props.login(token);
  }

  toggleChat(){

  }

  toggleMenu(){
    if(this.props.auth && !this.state.toggleMenu) this.setState({toggleMenu: true});
    if(this.props.auth && this.state.toggleMenu) this.setState({toggleMenu: false});
  }

  render(){
    console.log('App props: ', this.props);
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
        {util.renderIf(this.props.auth && this.state.toggleMenu,
          <div className='menu'>
          Youre logged in menu:
            <button onClick={this.props.goToChat}> CHAT </button>
            <button onClick={this.props.goToSettings}> SETTINGS </button>
            <button onClick={this.props.logout}> LOGOUT </button>
          </div>
        )}
        <main className='main'>
          <br></br>
          This is what route youre on:
          <MemoryRouter>
            <Switch location={{pathname: this.props.route}}>
              <Route path='/landing' component={Landing} />
              <Route path='/chat' component={() => <p> Chat page </p>} />
              <Route path='/signup' component={SignupForm} />
              <Route path='/login' component={LoginForm} />
              <Route path='/settings' component={() => <p> Settings page </p>}/>
            </Switch>
          </MemoryRouter>
        </main>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  auth: state.auth,
  route: state.route,
});

let mapDispatchToProps = (dispatch) => ({
  login: (token) => dispatch(auth.login(token)),
  logout: () => dispatch(auth.logout()),
  goToSettings: (token) => dispatch(route.switchRoute('/settings')),
  goToChat: (token) => dispatch(route.switchRoute('/chat')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
