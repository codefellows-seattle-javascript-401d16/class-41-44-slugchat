import React from 'react'
import * as _ from 'lodash'
import {connect} from 'react-redux'
import superagent from 'superagent'
import * as util from '../../lib/util.js'
import * as auth from '../../action/auth.js'

class LoginContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    return this.props.login({
      username: this.state.username,
      password: this.state.password,
    })
  }

  handleChange(e){
    let {name, value} = e.target
    this.setState({[name]: value})
  }

  render(){
    return(
      <div className='login-container'>
      <form onSubmit={this.handleSubmit}>

        <input
          name='username'
          type='text'
          placeholder='username'
          value={this.state.username}
          onChange={this.handleChange}
          />

        <input
          name='password'
          type='password'
          placeholder='password'
          value={this.state.password}
          onChange={this.handleChange}
          />

        <button type='submit'> login </button>
      </form>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
})

export const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(auth.loginRequest(user)),
})

export default connect (mapStateToProps, mapDispatchToProps)(LoginContainer)
