//action that routes the path to the route reducer to update state
export const routeSwitch = (path) => ({
  type: 'ROUTE_SWITCH',
  payload: path,
});
