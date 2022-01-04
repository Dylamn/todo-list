import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer } from '../store/reducers'
import { todoReducer } from "../features/todos/store/reducers";
import thunk from "redux-thunk";
import { Router, useLocation } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

export const createNewMockStore = () => {
  return createStore(combineReducers({
    auth: authReducer,
    todos: todoReducer
  }), applyMiddleware(thunk))
}

export const LocationDisplay = () => {
  const location = useLocation()

  return <div data-testid="location-display">{JSON.stringify(location)}</div>
}

export const getLocationDisplay = () => screen.getByTestId('location-display')

/**
 * Returns an additional component with a test id `location-display` which can
 * be used to assert the current route location. All wrapped by a <Router />.
 *
 * @param ui
 * @param route
 * @param options
 */
export const renderWithStoreAndRouter = (ui, route, options = {}) => {
  const store = createNewMockStore()
  const history = createMemoryHistory()
  history.push(route)

  return render(
    <>
      {ui}
      <LocationDisplay />
    </>, {
      wrapper: ({children}) => (
        <Provider store={store}>
          <Router location={history.location} navigator={history}>
            {children}
          </Router>
        </Provider>
      ),
      ...options,
    }
  )
}
