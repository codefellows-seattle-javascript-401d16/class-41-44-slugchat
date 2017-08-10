import React from 'react';
import {connect} from 'react-redux';
import * as auth from '../../action/auth-action.js';

class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
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
    this.props.login({
      username: this.state.username,
      password: this.state.password,
    });
  }

  render(){
    return(
      <div className='signup-form'>
        hey from login up form
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={this.state.username}
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
  login: (userData) => dispatch(auth.loginRequest(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
