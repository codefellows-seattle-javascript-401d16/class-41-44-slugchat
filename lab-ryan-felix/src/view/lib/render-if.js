const renderIf = (condition, component, alternative) => (
  condition ? component : alternative
);

export default renderIf;
