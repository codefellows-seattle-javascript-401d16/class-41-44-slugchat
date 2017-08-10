import * as chatActions from '../action/chat.js';

const MESSAGE = store => socket => payload => {
  store.dispatch(chatActions.message(payload));
};

export default {MESSAGE};
