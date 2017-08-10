export default (state = [], {type, payload}) => {
  switch(type) {
    case 'SIGNIN':
      return [
        ...state,
        {
          content: 'you joined the chat',
          meta: true,
        },
      ];
    case 'SIGNOUT':
      return [];
    case 'USER_CONNECTED':
      return [...state, payload];
    case 'USER_DISCONNECTED':
      return [...state, payload];
    case 'MESSAGE':
      return [...state, payload];
    default:
      return state;
  }
};
