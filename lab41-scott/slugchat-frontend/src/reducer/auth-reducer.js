//handle the token when a user logs in/out

export default (state=null, action) => {
  let {type, payload} = action;

  switch(type){
  case 'LOGIN':
    return payload;

  case 'LOGOUT':
    return null;

  default: return state;
  }
};
