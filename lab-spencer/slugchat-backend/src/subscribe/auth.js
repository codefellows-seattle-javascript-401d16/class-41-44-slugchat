import User from '../model/user.js';

const SIGNIN = socket => payload => {
  User.fromToken(payload)
    .then(user => {
      socket.username = user.username;
      let result = {
        username: socket.username,
        content: 'has joined the chat!',
        meta: true,
      };
      socket.broadcast.emit('USER_CONNECTED', result);
    });
};

const SIGNOUT = socket => payload => {
  let result = {
    username: socket.username,
    content: 'has left the chat!',
    meta: true,
  };
  socket.broadcast.emit('USER_DISCONNECTED', result);
  delete socket.username;
};

export default {SIGNIN, SIGNOUT};
