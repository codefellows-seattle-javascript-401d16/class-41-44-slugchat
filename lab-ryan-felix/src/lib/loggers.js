const log = it => {
  console.log(it);
  return it;
};

const error = it => {
  console.error(it);
  return it;
};

const dir = it => {
  console.dir(it);
  return it;
};

export default {
  log,
  error,
  dir,
};
