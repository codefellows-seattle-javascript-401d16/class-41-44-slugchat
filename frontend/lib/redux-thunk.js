export default (store) => (next) => (action) => {
  return typeof action === 'function'
    ? action(store.desipatch, store.getState)
    : next(action)
}
