const classToggler = (options) => (
  Object.keys(options).filter(key => !!options[key]).join(' ')
);

export default classToggler;
