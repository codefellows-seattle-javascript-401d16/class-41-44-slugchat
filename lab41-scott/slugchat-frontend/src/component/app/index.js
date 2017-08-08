import React from 'react';
import * as util from '../../lib/util.js';
import {connect} from 'react-redux';


class App extends React.Component{
  componentDidMount(){
    let token = util.cookieFetch('X-Slugchat-Token');
    console.log('app token: ', token);
    if(token) this.props.login(token);
  }
  render(){
    return(
      <div className='app'>
      Hello App
      </div>
    );
  }
}

export default App;
