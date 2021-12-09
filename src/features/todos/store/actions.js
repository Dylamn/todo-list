import apiFirebase from "../../../config/api.firebase";

export const REQUEST_TODO = 'REQUEST_TODO'
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS'
export const FETCH_TODO_ERROR = 'FETCH_TODO_ERROR'

export const TRY_ADD_TODO = 'TRY_ADD_TODO'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
export const ADD_TODO_ERROR = 'ADD_TODO_ERROR'

export const TRY_TOGGLE_TODO = 'TRY_TOGGLE_TODO'
export const TOGGLE_TODO_SUCCESS = 'TOGGLE_TODO_SUCCESS'
export const TOGGLE_TODO_ERROR = 'TOGGLE_TODO_ERROR'

export const TRY_DELETE_TODO = 'TRY_DELETE_TODO'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
export const DELETE_TODO_ERROR = 'DELETE_TODO_ERROR'

export const requestTodo = () => ({
  type: REQUEST_TODO
})
export const fetchTodoSuccess = (todos) => ({
  type: FETCH_TODO_SUCCESS,
  todos
})
export const fetchTodoError = (error) => ({
  type: FETCH_TODO_ERROR,
  error
})
export const fetchTodo = () => {
  return (dispatch) => {
    dispatch(requestTodo())

    return apiFirebase.get('todos.json')
      .then(
        response => {
          const data = response.data
          dispatch(fetchTodoSuccess(data))
        },
        err => dispatch(fetchTodoError(err))
      )
  }
}

export const addTodoSuccess = todo => ({
  type: ADD_TODO_SUCCESS,
  todo
})
export const addTodoError = error => ({
  type: ADD_TODO_ERROR,
  error
})
export const tryAddTodo = todo => {
  return (dispatch, getState) => {
    dispatch({
      type: TRY_ADD_TODO
    })
    const todos = [...getState().todos.data, todo]

    return apiFirebase.put('todos.json', todos)
      .then(
        response => dispatch(addTodoSuccess(todo)),
        err => dispatch(addTodoError(err))
      )
  }
}


export const toggleTodoSuccess = (todos) => ({
  type: TOGGLE_TODO_SUCCESS,
  todos
})
export const toggleTodoError = error => ({
  type: TOGGLE_TODO_ERROR,
  error
})
export const tryToggleTodo = todo => {
  return (dispatch, getState) => {
    dispatch({
      type: TRY_TOGGLE_TODO
    })
    const todos = getState().todos.data.map(t => {
      if (t.id === todo.id) {
        t.done = !t.done
      }

      return t
    })

    return apiFirebase.put('todos.json', todos)
      .then(
        (response) => dispatch(toggleTodoSuccess(response.data)),
        (err) => dispatch(toggleTodoError(err))
      )
  }
}


export const deleteTodoSuccess = todos => ({
  type: DELETE_TODO_SUCCESS,
  todos
})
export const deleteTodoError = error => ({
  type: DELETE_TODO_ERROR,
  error
})
export const tryDeleteTodo = todo => {
  return (dispatch, getState) => {
    dispatch({
      type: TRY_DELETE_TODO
    })
    const todos = getState().todos.data.filter(t => t.id !== todo.id)

    apiFirebase.put('todos.json', todos).then(
      response => dispatch(deleteTodoSuccess(response.data)),
      error => dispatch(deleteTodoError(error))
    )
  }
}
