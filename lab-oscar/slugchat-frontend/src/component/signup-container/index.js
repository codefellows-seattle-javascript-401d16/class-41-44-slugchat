import React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';
import superagent from 'superagent';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth.js';
import validator from 'validator';

const Tooltip = (props) => {
  return (
    <div className='tooltip'>
      {props.message}
    </div>
  )
}

export class SignupContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      emailError: '',
      usernameError: '',
      passwordError: '',
      usernameAvailable: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateChange = this.validateChange.bind(this);
    this.usernameAvailable = _.debounce(this.usernameCheckAvailable.bind(this), 250);
  }
  usernameCheckAvailable() {
    return superagent.get(`${__API_URL__}/usernames/${this.state.username}`)
      .then(() => this.setState({usernameAvailable: true}))
      .catch(() => this.setState({usernameAvailable: false}))
  }

  handleSubmit(e){
    e.preventDefault();
    if(!this.state.usernameError){
      return this.props.signup({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      });
    }
  }
  validateChange(e){
    let {name, value} = e.target;
    let error = null;
    if(name === 'username') {
      if(!value){
        error = 'username cannot be empty';
      } else if (!validator.isAlphanumeric(value)){
        error = 'username can only contain letters and numbers';
      }
    } else if (name === 'email'){
      if(!value){
        error = 'email can not be empty';
      } if (!validator.isEmail(value)){
        error = 'must be a valid email';
      }
    } else if (name === 'password'){
      if(!value){
        error = 'password can not be empty';
      } else if (!validator.isAlphanumeric(value)){
        error = 'password can only contain letters and numbers';
      }
    }
    this.setState({[`${name}Error`]: error});
  }

  handleChange(e){

    this.validateChange({...e});
    let {name, value} = e.target;
    this.setState({[name]: value});
    if(name === 'username')
      this.usernameCheckAvailable();
  }

  render() {
    return (
      <div className='signup-container'>
        <form onSubmit={this.handleSubmit}>
          <Tooltip message={this.state.emailError} />
          <input
            name='email'
            type='email'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Tooltip message={this.state.usernameError} />
          <input
            name='username'
            type='text'
            placeholder='Username'
            value={this.state.username}
            onChange={this.handleChange}
          />

          <Tooltip message={this.state.passwordError} />
          <div className='username-feeback'>
            {util.renderIf(this.state.username,
              <span>
                {this.state.username} is
                {this.state.usernameAvailable ? ' available' : ' taken'}
              </span>
            )}
          </div>

          <input
            name='password'
            type='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleChange}
          />

          <button type='submit'> SignUP </button>
        </form>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({});

export const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(auth.signupRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
