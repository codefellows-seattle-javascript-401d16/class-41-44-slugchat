//handle the route state to redirect the user.

export default (state='/landing', action) => {
  let {type, payload} = action;

  switch (type) {
  case 'LOGIN':
    return '/chat/';

  case 'LOGOUT':
    return '/landing';

  case 'SWITCH_ROUTE':
    return payload;

  default: return state;

  }
};
