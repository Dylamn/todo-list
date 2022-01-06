import { cleanup, screen } from '@testing-library/react';
import { getLocationDisplay, renderWithStoreAndRouter } from "./config/test.helpers";
import { createTodo } from "./features/todos/__test__/helpers";
import apiFirebaseMock from "./config/api.firebase";
import App from './App';


jest.mock('./config/api.firebase')

const todos = [
  createTodo('TestingTodo is active'),
  createTodo('TestingTodo is done', true)
]

describe("Tests - App Component", () => {
  afterEach(() => cleanup())

  test('should display the homepage on /', () => {
    const route = '/'

    renderWithStoreAndRouter(<App />, route)

    expect(screen.getByTestId('location-display')).toHaveTextContent(route)
    screen.getByText(/^An application created to learning React and Redux./i)
  });

  test('should display all todos on /todos', async () => {
    const route = '/todos'

    apiFirebaseMock.fetchTodos.mockResolvedValueOnce({data: todos})

    renderWithStoreAndRouter(<App />, route)

    await screen.findByText(/Add a todo/i)

    expect(apiFirebaseMock.fetchTodos).toHaveBeenCalled()
    expect(screen.getAllByText(/TestingTodo/).length).toBe(2)
    expect(screen.getByTestId('location-display')).toHaveTextContent(route)
  });

  test('should display todos with `done` status on /todos?filter=done', async () => {
    const params = {filter: "done"}
    const route = '/todos'
    const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
    const routeWithParams = route + '?' + queryString

    apiFirebaseMock.fetchTodos.mockResolvedValueOnce({data: todos})

    renderWithStoreAndRouter(<App />, routeWithParams)
    await screen.findByText(/Add a todo/i)

    const locationDisplay = getLocationDisplay()

    expect(apiFirebaseMock.fetchTodos).toHaveBeenCalled()
    expect(locationDisplay).toHaveTextContent(route)
    expect(locationDisplay).toHaveTextContent(queryString)
    expect(screen.getAllByText(/TestingTodo/i).length).toBe(1)
    expect(screen.getByText(/is done$/i)).toBeInTheDocument()
    expect(screen.queryByText(/is active/i)).not.toBeInTheDocument()
  });

  test('should display todos with `active` status on /todos?filter=active', async () => {
    const params = {filter: "active"}
    const route = '/todos'
    const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
    const routeWithParams = route + '?' + queryString

    apiFirebaseMock.fetchTodos.mockResolvedValueOnce({data: todos})

    renderWithStoreAndRouter(<App />, routeWithParams)
    await screen.findByText(/Add a todo/i)

    const locationDisplay = getLocationDisplay()

    expect(apiFirebaseMock.fetchTodos).toHaveBeenCalled()
    expect(locationDisplay).toHaveTextContent(route)
    expect(locationDisplay).toHaveTextContent(queryString)
    expect(screen.getAllByText(/TestingTodo/i).length).toBe(1)
    expect(screen.queryByText(/is done$/i)).toBeNull()
    expect(screen.getByText(/is active/i)).toBeInTheDocument()
  });
});
