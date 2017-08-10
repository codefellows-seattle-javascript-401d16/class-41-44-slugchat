import * as chatActions from '../action/chat.js';

const USER_CONNECTED = store => socket => payload => {
  store.dispatch(chatActions.userConnected(payload));
};

const USER_DISCONNECTED = store => socket => payload => {
  store.dispatch(chatActions.userDisconnected(payload));
};

export default {USER_CONNECTED, USER_DISCONNECTED};
