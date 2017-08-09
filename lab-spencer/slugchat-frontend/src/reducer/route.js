export default (state = '/landing', {type, payload}) => {
  switch(type) {
    case 'SIGNIN':
      return '/chat';
    case 'SIGNOUT':
      return '/landing';
    case 'SWITCH_ROUTE':
      return payload;
    default:
      return state;
  }
}
