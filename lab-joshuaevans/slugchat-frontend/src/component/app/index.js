import React from 'react';
import { connect } from 'react-redux';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as util from '../../lib/util.js';
import * as auth from '../../action/auth.js';
import * as route from '../../action/route.js';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

import LandingContainer from '../landing-container';
import SignupContainer from '../signup-container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 3 };
  }

  componentDidMount() {
    const token = util.cookieFetch('X-Slugchat-Token');
    if (token) {
      this.props.login(token);
    }
  }

  handleChange(e, index, value) {
    this.setState({ value });
  }

  render() {
    return (
      <div className="app">
        <MuiThemeProvider>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                <div className="toolbar">
                  <button
                    onClick={this.toggleMenu}
                    className="logo"
                  >
                slugchat
                  </button>
                  <button
                    className="toogle-chat"
                    onClick={this.toggleChat}
                  >
                  show/hide chat
                  </button>
                </div>
                {util.renderIf(this.props.token,
                  <div className="menu">
                    <MenuItem value={1} onClick={this.props.goToChat} primaryText="chat" />
                    <MenuItem value={2} onClick={this.props.goToSettings} primaryText="settings" />
                    <MenuItem value={3} onClick={this.props.logout} primaryText="logout" />
                  </div>,
                )}
              </DropDownMenu>
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
        <MemoryRouter>
          <Switch location={{ pathname: this.props.route }}>
            <Route path="/landing" component={LandingContainer} />
            <Route path="/chat" component={() => <p> chat</p>} />
            <Route path="/signup" component={SignupContainer} />
            <Route path="/login" component={() => <p> login</p>} />
            <Route path="/settings" component={() => <p> settings</p>} />
          </Switch>
        </MemoryRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  route: state.route,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(auth.logout()),
  login: token => dispatch(auth.login(token)),
  goToChat: () => dispatch(route.switchRoute('/chat')),
  goToSettings: () => dispatch(route.switchRoute('/settings')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
