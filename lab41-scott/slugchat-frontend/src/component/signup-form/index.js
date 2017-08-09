import React from 'react';

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){

  }

  handleSubmit(e){
    e.preventDefault();
  }

  render(){
    return(
      <div className='signup-form'>
        hey from sign up form
      </div>
    );
  }
}

export default SignupForm;
