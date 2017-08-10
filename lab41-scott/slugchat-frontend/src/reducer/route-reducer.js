//handle the route state to redirect the user.

export default (state='/landing', action) => {
  let {type, payload} = action;

  switch (type) {
  case 'LOGIN':
    return '/chat';

  case 'LOGOUT':
    return '/landing';

  case 'ROUTE_SWITCH':
    return payload;

  default: return state;

  }
};
