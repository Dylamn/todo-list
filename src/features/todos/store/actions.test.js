import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { createTodo } from "../__test__/helpers";
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
  toggleEditModeAction,
  tryAddTodoAction,
  tryDeleteTodoAction,
  tryEditTodoAction
} from "./actions";

jest.mock('../../../config/api.firebase')

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

describe('test asynchronous actions (thunks)', () => {
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

    const expectedAction = {
      type: FETCH_TODO_SUCCESS,
      todos
    }

    apiFirebase.fetchTodos.mockResolvedValueOnce({data: todos})

    await store.dispatch(fetchTodoAction())

    expect(apiFirebase.fetchTodos).toHaveBeenCalled()
    expect(store.getActions()).toContainEqual(expectedAction)
  })
  test('should dispatch `fetchTodoErrorAction` action', async () => {
    const store = mockStore(initialState)
    const error = new Error('Fetch error')

    const expectedAction = {
      type: FETCH_TODO_ERROR,
      error
    }

    apiFirebase.fetchTodos.mockRejectedValueOnce(error)

    await store.dispatch(fetchTodoAction())

    expect(apiFirebase.fetchTodos).toHaveBeenCalled()
    expect(store.getActions()).toContainEqual(expectedAction)
  })

  test('should dispatch `addTodoSuccessAction` action', async () => {
    const store = mockStore(initialState)
    const todo = createTodo('Add me')

    const expectedAction = {
      type: ADD_TODO_SUCCESS,
      todo
    }

    await store.dispatch(tryAddTodoAction(todo))

    expect(apiFirebase.saveTodos).toHaveBeenCalled()
    expect(store.getActions()).toContainEqual(expectedAction)
  })
  test('should dispatch `addTodoErrorAction` action', async () => {
    const store = mockStore(initialState)
    const todo = createTodo("You can't add me")
    const error = new Error('Add error')

    const expectedAction = {
      type: ADD_TODO_ERROR,
      error
    }

    apiFirebase.saveTodos.mockRejectedValueOnce(error)

    await store.dispatch(tryAddTodoAction(todo))

    expect(apiFirebase.saveTodos).toHaveBeenCalled()
    expect(store.getActions()).toContainEqual(expectedAction)
  })

  test('should dispatch `editTodoSuccessAction` action', async () => {
    const store = mockStore(initialState)
    const todo = createTodo("Testing")

    const expectedAction = {
      type: EDIT_TODO_SUCCESS,
      todo
    }

    apiFirebase.saveTodos.mockResolvedValueOnce(todo)

    await store.dispatch(tryEditTodoAction(todo))

    expect(apiFirebase.saveTodos).toHaveBeenCalled()
    expect(store.getActions()).toContainEqual(expectedAction)
  });
  test('should dispatch `editTodoErrorAction` action', async () => {
    const store = mockStore(initialState)
    const todo = createTodo("Testing more and more...")
    const error = new Error('edit error')

    const expectedAction = {
      type: EDIT_TODO_ERROR,
      error
    }

    apiFirebase.saveTodos.mockRejectedValueOnce(error)

    await store.dispatch(tryEditTodoAction(todo))

    expect(apiFirebase.saveTodos).toHaveBeenCalled()
    expect(store.getActions()).toContainEqual(expectedAction)
  });

  test('should dispatch `deleteTodoSuccessAction` action', async () => {
    const store = mockStore({
      ...initialState,
      ...{
        todos: {
          data: [createTodo("First todo")]
        }
      }
    })
    const todo = store.getState().todos.data[0]
    const result = store.getState().todos.data.filter(t => t.id !== todo.id)

    const expectedAction = {
      type: DELETE_TODO_SUCCESS,
      todos: result
    }

    await store.dispatch(tryDeleteTodoAction(todo))

    expect(apiFirebase.saveTodos).toHaveBeenCalled()
    expect(store.getActions()).toContainEqual(expectedAction)
  });
  test('should dispatch `deleteTodoErrorAction` action', async () => {
    const store = mockStore(initialState)
    const todo = createTodo("Delete an error")
    const error = new Error('Delete error')

    const expectedAction = {
      type: DELETE_TODO_ERROR,
      error
    }

    apiFirebase.saveTodos.mockRejectedValueOnce(error)

    await store.dispatch(tryDeleteTodoAction(todo))

    expect(store.getActions()).toContainEqual(expectedAction)
  });

  test('should dispatch `toggleEditModeAction` action', async () => {
    expect.assertions(1)

    const store = mockStore(initialState)
    const todo = createTodo('Toggle to edit')

    const expectedAction = {
      type: TOGGLE_EDIT_MODE,
      todo
    }

    await store.dispatch(toggleEditModeAction(todo))

    expect(store.getActions()[0]).toEqual(expectedAction)
  });
});
