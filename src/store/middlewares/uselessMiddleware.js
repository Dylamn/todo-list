function uselessMiddleware ({dispatch, getState}) {
  return next => action => {
    console.log("I'm not a really useful middleware...")
    return next(action)
  }
}

export default uselessMiddleware
