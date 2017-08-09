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
  );
};

export class SignupContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      emailError: null,
      usernameError: null,
      passwordError: null,
      usernameAvailable: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateChange = this.validateChange.bind(this);
    this.usernameCheckAvailable = _.debounce(this.usernameCheckAvailable.bind(this), 250);
  }

  usernameCheckAvailable(){
    return superagent.get(`${__API_URL__}/usernames/${this.state.username}`)
      .then(() => this.setState({usernameAvailable: true}))
      .catch(() => this.setState({usernameAvailable: false}));
  }

  handleSubmit(e){
    e.preventDefault();
    if(!this.state.usernameError && !this.state.emailError && !this.state.passwordError){
      console.log('submit working');
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
    if(name === 'username'){
      if(!value) {
        error = 'Username cannot be empty.';
      } else if (!validator.isAlphanumeric(value)) {
        error = 'Username can only contain letters and numbers.';
      }
    } else if (name === 'email'){
      if(!value) {
        error = 'Email cannot be empty.';
      } if (!validator.isEmail(value)) {
        error = 'Email address is invalid.';
      }
    } else if (name === 'password') {
      if(!value){
        error = 'Password cannot be empty.';
      } else if (!validator.isAlphanumeric(value)){
        error = 'Password can only contain letters and numbers.';
      }
    }
    console.log('error: ', error);
    this.setState({[`${name}Error`]: error});
  }


  handleChange(e){
    this.validateChange({...e});
    let {name, value} = e.target;
    this.setState({[name]: value});
    if(name === 'username')
      this.usernameCheckAvailable();
  }

  render(){
    return (
      <div className='signup-container'>
        <form onSubmit={this.handleSubmit}>
          <input
            name='email'
            type='text'
            placeholder='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Tooltip message={this.state.emailError} />
          <input
            name='username'
            type='text'
            placeholder='username'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <Tooltip message={this.state.passwordError} />
          <div className='username-feedback'>
            {util.renderIf(this.state.username,
              <span>
                {this.state.username} is
                { this.state.usernameAvailable ? ' available' : ' taken' }
              </span>
            )}
          </div>
          <input
            name='password'
            type='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type='submit'> signup </button>
        </form>
      </div>
    );
  }
}


export const mapStateToProps = (state) => ({
});

export const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(auth.signupRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
