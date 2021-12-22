import apiFirebase, { clientFirebase } from "../../../config/api.firebase";

export const REQUEST_TODO = 'REQUEST_TODO'
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS'
export const FETCH_TODO_ERROR = 'FETCH_TODO_ERROR'

export const TRY_ADD_TODO = 'TRY_ADD_TODO'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
export const ADD_TODO_ERROR = 'ADD_TODO_ERROR'

export const TRY_EDIT_TODO = 'TRY_EDIT_TODO'
export const EDIT_TODO_SUCCESS = 'EDIT_TODO_SUCCESS'
export const EDIT_TODO_ERROR = 'EDIT_TODO_ERROR'

export const TRY_DELETE_TODO = 'TRY_DELETE_TODO'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
export const DELETE_TODO_ERROR = 'DELETE_TODO_ERROR'

export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE'

export const requestTodoAction = () => ({
  type: REQUEST_TODO
})
export const fetchTodoSuccessAction = (todos) => ({
  type: FETCH_TODO_SUCCESS,
  todos
})
export const fetchTodoErrorAction = (error) => ({
  type: FETCH_TODO_ERROR,
  error
})
export const fetchTodoAction = () => {
  return async dispatch => {
    dispatch(requestTodoAction())

    try {
      const response = await clientFirebase.get('todos.json')
      const data = response.data
      dispatch(fetchTodoSuccessAction(data))
    } catch (error) {
      dispatch(fetchTodoErrorAction(error))
    }
  }
}

export const addTodoSuccessAction = todo => ({
  type: ADD_TODO_SUCCESS,
  todo
})
export const addTodoErrorAction = error => ({
  type: ADD_TODO_ERROR,
  error
})
export const tryAddTodoAction = todo => {
  return async (dispatch, getState) => {
    dispatch({
      type: TRY_ADD_TODO
    })
    const todos = [...getState().todos.data, todo]

    try {
      await apiFirebase.saveTodos(todos)
      dispatch(addTodoSuccessAction(todo))
    } catch (e) {
      dispatch(addTodoErrorAction(e))
    }
  }
}


export const editTodoSuccessAction = (todo) => ({
  type: EDIT_TODO_SUCCESS,
  todo
})
export const editTodoErrorAction = error => ({
  type: EDIT_TODO_ERROR,
  error
})
export const tryEditTodoAction = todo => {
  return async (dispatch, getState) => {
    dispatch({
      type: TRY_EDIT_TODO
    })
    const todos = getState().todos.data.map(t => t.id === todo.id ? todo : t)

    try {
      await apiFirebase.saveTodos(todos)
      dispatch(editTodoSuccessAction(todo))
    }catch (error) {
      dispatch(editTodoErrorAction(error))
    }
  }
}


export const deleteTodoSuccessAction = todos => ({
  type: DELETE_TODO_SUCCESS,
  todos
})
export const deleteTodoErrorAction = error => ({
  type: DELETE_TODO_ERROR,
  error
})
export const tryDeleteTodoAction = todo => {
  return async (dispatch, getState) => {
    dispatch({
      type: TRY_DELETE_TODO
    })
    const todos = getState().todos.data.filter(t => t.id !== todo.id)
    try {
      await apiFirebase.saveTodos(todos)
      dispatch(deleteTodoSuccessAction(todos))
    } catch (error) {
      dispatch(deleteTodoErrorAction(error))
    }
  }
}

export const toggleEditModeAction = (todo) => ({
  type: TOGGLE_EDIT_MODE,
  todo
})