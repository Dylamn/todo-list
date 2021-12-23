import { v4 as uuid } from "uuid";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import apiFirebase from "../../../config/api.firebase";
import {
  ADD_TODO_ERROR,
  ADD_TODO_SUCCESS,
  addTodoErrorAction,
  addTodoSuccessAction,
  DELETE_TODO_ERROR,
  DELETE_TODO_SUCCESS,
  deleteTodoErrorAction,
  deleteTodoSuccessAction,
  EDIT_TODO_ERROR,
  EDIT_TODO_SUCCESS,
  editTodoErrorAction,
  editTodoSuccessAction,
  FETCH_TODO_ERROR,
  FETCH_TODO_SUCCESS, fetchTodoAction,
  fetchTodoErrorAction,
  fetchTodoSuccessAction,
  REQUEST_TODO,
  requestTodoAction,
  TOGGLE_EDIT_MODE,
  toggleEditModeAction, TRY_ADD_TODO,
  tryAddTodoAction,
} from "./actions";

jest.mock('../../../config/api.firebase')

/**
 * Create a todo.
 *
 * @param {string} title
 * @return {{id: string, title: string, done: boolean}}
 */
function createTodo (title) {
  return {
    id: uuid(),
    title: title,
    done: false
  }
}

describe('test synchronous action creators', () => {
  test("should create `requestTodoAction` action", () => {
    const expectedAction = {
      type: REQUEST_TODO
    }

    expect(requestTodoAction()).toEqual(expectedAction)
  })
  test("should create `fetchTodoSuccessAction` action", () => {
    const todos = [
      createTodo('Test'),
      createTodo('Another test')
    ]

    const expectedAction = {
      type: FETCH_TODO_SUCCESS,
      todos
    }

    expect(fetchTodoSuccessAction(todos)).toEqual(expectedAction)
  })
  test("should create `fetchTodoErrorAction` action", () => {
    const error = new Error('Fetch error')

    const expectedAction = {
      type: FETCH_TODO_ERROR,
      error
    }

    expect(fetchTodoErrorAction(error)).toEqual(expectedAction)
  })

  test("should create `addTodoSuccessAction` action", () => {
    const todo = createTodo('Testing')

    const expectedAction = {
      type: ADD_TODO_SUCCESS,
      todo
    }

    expect(addTodoSuccessAction(todo)).toEqual(expectedAction)
  })
  test("should create `addTodoErrorAction` action", () => {
    const error = new Error("Add error")

    const expectedAction = {
      type: ADD_TODO_ERROR,
      error
    }

    expect(addTodoErrorAction(error)).toEqual(expectedAction)
  })

  test("should create `editTodoSuccessAction` action", () => {
    const todo = createTodo('Write tests')

    const expectedAction = {
      type: EDIT_TODO_SUCCESS,
      todo
    }

    expect(editTodoSuccessAction(todo)).toEqual(expectedAction)
  })
  test("should create `editTodoErrorAction` action", () => {
    const error = new Error('Edit error')

    const action = {
      type: EDIT_TODO_ERROR,
      error
    }

    expect(editTodoErrorAction(error)).toEqual(action)
  })

  test("should create `deleteTodoSuccessAction` action", () => {
    const todos = [
      createTodo('Testing')
    ]

    const expectedAction = {
      type: DELETE_TODO_SUCCESS,
      todos
    }

    expect(deleteTodoSuccessAction(todos)).toEqual(expectedAction)
  })
  test("should create `deleteTodoErrorAction` action", () => {
    const error = new Error("Delete error")

    const expectedAction = {
      type: DELETE_TODO_ERROR,
      error
    }

    expect(deleteTodoErrorAction(error)).toEqual(expectedAction)
  })

  test("should create ``toggleEditModeAction` action", () => {
    const todo = createTodo('Test toggle')

    const expectedAction = {
      type: TOGGLE_EDIT_MODE,
      todo
    }

    expect(toggleEditModeAction(todo)).toEqual(expectedAction)
  })
});

describe('test asynchronous actions', () => {
  const initialState = {
    todos: {
      data: [],
      error: null
    }
  }
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  test('should dispatch `fetchTodoSuccessAction` action', async () => {
    const store = mockStore(initialState)
    const todos = [
      createTodo('Another'),
      createTodo('Test'),
    ]

    const requestAction = {
      type: REQUEST_TODO
    }
    const fetchAction = {
      type: FETCH_TODO_SUCCESS,
      todos
    }

    apiFirebase.fetchTodos.mockResolvedValueOnce({data: todos})

    await store.dispatch(fetchTodoAction())

    expect(store.getActions()[0]).toEqual(requestAction)
    expect(store.getActions()[1]).toEqual(fetchAction)
  })
  test('should dispatch `fetchTodoErrorAction` action', async () => {
    const store = mockStore(initialState)
    const error = new Error('Fetch error')

    const requestAction = {
      type: REQUEST_TODO
    }
    const fetchAction = {
      type: FETCH_TODO_ERROR,
      error
    }

    apiFirebase.fetchTodos.mockRejectedValueOnce(error)

    await store.dispatch(fetchTodoAction())

    expect(store.getActions()[0]).toEqual(requestAction)
    expect(store.getActions()[1]).toEqual(fetchAction)
  })

  test('should dispatch `addTodoSuccessAction` action', async () => {
    const store = mockStore(initialState)
    const todo = createTodo('Add me')

    const tryAddAction = {
      type: TRY_ADD_TODO
    }
    const addSuccessAction = {
      type: ADD_TODO_SUCCESS,
      todo
    }

    await store.dispatch(tryAddTodoAction(todo))

    expect(apiFirebase.saveTodos).toHaveBeenCalled()

    expect(store.getActions()[0]).toEqual(tryAddAction)
    expect(store.getActions()[1]).toEqual(addSuccessAction)
  })
  test('should dispatch `addTodoErrorAction` action', async () => {
    const store = mockStore(initialState)
    const todo = createTodo("You can't add me")
    const error = new Error('Add error')

    const tryAddAction = {
      type: TRY_ADD_TODO
    }
    const addErrorAction = {
      type: ADD_TODO_ERROR,
      error
    }

    apiFirebase.saveTodos.mockRejectedValueOnce(error)

    try {
      await store.dispatch(tryAddTodoAction(todo))
    } catch (e) {
      expect(apiFirebase.saveTodos).toHaveBeenCalled()
      expect(apiFirebase.saveTodos).toThrow(error)
    }

    expect(store.getActions()[0]).toEqual(tryAddAction)
    expect(store.getActions()[1]).toEqual(addErrorAction)
  })
});