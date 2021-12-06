import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from 'redux-thunk'
import logger from "redux-logger";

import * as reducers from "./reducers";

const todosReducers = combineReducers(reducers)
const middlewares = [thunk]


if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = createStore(
  todosReducers,
  composeWithDevTools(
    applyMiddleware(
      ...middlewares
    )
  )
)

export default store
