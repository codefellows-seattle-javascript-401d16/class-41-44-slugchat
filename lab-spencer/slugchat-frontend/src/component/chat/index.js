import React from 'react';
import {connect} from 'react-redux';
import * as chatActions from '../../action/chat.js';
import * as util from '../../lib/util.js';

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.messageCreate({
      meta: false,
      content: this.state.content,
    });
  }

  render() {
    return (
      <div className='chat-container'>
        <h1>SlugChat</h1>

        <ul>
          {this.props.chatHistory.map((item, i) => {
            // util.log(item);
          return  <li key={i}>
              <span>{item.username}: {item.content}</span>
            </li>
          }
          )}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <textarea
            name='content'
            value={this.state.content}
            onChange={this.handleChange}
          />
          <button type='submit'>Send</button>
        </form>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  chatHistory: state.history,
});

export const mapDispatchToProps = dispatch => ({
  messageCreate: message => dispatch(chatActions.message(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
