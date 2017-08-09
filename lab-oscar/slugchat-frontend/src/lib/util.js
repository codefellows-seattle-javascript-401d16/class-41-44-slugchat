export const log = (...args) =>
  __DEBUG__ ? console.log(...args) : undefined;

export const logError = (...args) =>
  __DEBUG__ ? console.error(...args) : undefined;

export const renderIf = (test, component) => test ? component : undefined;

export const cookieFetch = (key) => {
  let cookies = Object.assign(...document.cookie.split(';')
    .map(cookie => {
      let [key, value] = cookie.split('=');
      return {[key.trim()]: value};
    }));
  return cookies[key];
};
