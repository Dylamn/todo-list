function logMiddleware ({dispatch, getState}) {
  return next => action => {
    console.log({action}, {state: getState ()})
    return next(action)
  }
}

export default logMiddleware
