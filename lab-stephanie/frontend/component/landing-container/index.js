import React from 'react';
import { connect } from 'react-redux';
import * as route from '../../action/route.js'

class LandingContainer extends React.Component {
  render(){
    let a = document.createElement('a');
    let authQuery = querystring.stringify({
      client_id: __GOOGLE_CLIENT_ID__,
      response_type: 'code',
      redirect_uri: `${__API_URI__}/oauth/google/code`,
      scope: 'openid profile email',
      prompt: __DEBUG__ ? 'consent' : undefined
    return (
      <div className='landing-container'>
        <button> login</button>
        <button>signup</button>
        <a>login with google</a>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({

})

export const mapDispatchToProps = (dispatch) => ({
  goToSignup: () => dispatch(route.switchRoute('/signup'))
  goToSignin: () => dispatch(route.switchRoute('/login'))
})

export default
