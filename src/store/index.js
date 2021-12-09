import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from 'redux-thunk'
import logger from "redux-logger";

import { default as rootReducers } from "./reducers";

const appReducer = combineReducers(rootReducers)

const middlewares = [
  // Specify initial middlewares here...
  thunk
]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = createStore(
  appReducer,
  composeWithDevTools(
    applyMiddleware(
      ...middlewares
    )
  )
)

store.asyncReducers = {}

const createInjectReducer = store => (key, reducer) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(combineReducers({...rootReducers, ...store.asyncReducers}))
}

export const injectReducer = createInjectReducer(store)

export default store
