export const readCookie = (name) => {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
};

export const renderIf = (test, component) =>
  test ? component : undefined;

export const log = () =>
  __DEBUG__
  ? console.log(arguments)
  : undefined;

  export const logError = () =>
    __DEBUG__
    ? console.error(arguments)
    : undefined;

    export const cookieTime = (days) => {
      let result = new Date()
      let millisecondsPerDay = 86400000
      result.setTime(result.getTime() + (days * millisecondsPerDay))
      return result.toUTCString()
    }

    export const cookieCreate = (name, value, days) => {
      let expires = days ? ` ${cookieTime(days)};` : ''
      document.cookie = `${name}=${value};${expires} path='/'`
    }

    export const cookieFetch = (key) => {
      let cookies = Object.assign(...document.cookie.split(';')
        .map(cookie => {
          let [key, value] = cookie.split('=')
          return {[key.trim()]: value}
         }))
      return cookies[key]
    }

    export const cookieDelete = (key) => {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
