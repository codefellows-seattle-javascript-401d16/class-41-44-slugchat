import React from 'react';
import {connect} from 'react-redux';
import * as auth from '../../action/auth-action.js';

class SignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      emailError: false,
      usernameError: false,
      passwordError: false,
      usernameAvailable: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    let {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.signup({
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    });
  }

  render(){
    return(
      <div className='signup-form'>
        hey from sign up form
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({});
let mapDispatchToProps = (dispatch) => ({
  signup: (userData) => dispatch(auth.signupRequest(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
