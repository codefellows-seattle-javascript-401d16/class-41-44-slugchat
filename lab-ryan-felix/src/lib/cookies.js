const MS_PER_DAY = 8640000;

const daysToExpirationTime = days => {
  const result = new Date();
  result.setTime(result.getTime() + days * MS_PER_DAY);
  return result.toUTCString();
};

const create = (name, value, days) => {
  const expiration = days ? ` ${daysToExpirationTime(days)};` : '';
  document.cookie = `${name}=${value};${expiration} path='/'`;
};

const read = key => {
  const cookies = Object.assign(...document.cookies.split(';')
    .map(cookie => {
      const [key, value] = cookie.split('=');
      return {
        [key.trim()]: value,
      };
    }));
  return cookies[key];
};

const remove = key => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export default {
  create,
  read,
  remove,
};
