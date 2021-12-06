export {default as logMiddleware} from './logMiddleware'
export {default as uselessMiddleware} from './logMiddleware'

// Example of a method which will register middlewares to a new store
// export const registerMiddlewares = (store, middlewares) => {
//   const mids = [...middlewares].reverse()
//   let dispatch = store.dispatch
//
//   mids.forEach(middleware => (
//       dispatch = middleware(dispatch, store.getState)(dispatch)
//     )
//   )
//
//   return {
//     ...store,
//     dispatch
//   }
// }
// let store = createStore(...reducers)
// store = registerMiddlewares(store, [logMiddleware, uselessMiddleware])