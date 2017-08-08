import React from 'react'
import * as _ from 'lodash'
import {connect} from 'react-redux'
import superagent from 'superagent'

class LoginContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }
  render(){
    return(
      <h2>Login Form</h2>
    )
  }
}

export default LoginContainer
