import { injectReducer } from "../../../store";
import { todoReducer } from './reducers'

injectReducer('todos', todoReducer)
