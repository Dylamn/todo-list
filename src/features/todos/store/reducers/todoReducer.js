import * as actionTypes from "../actions";

const initialState = {
  data: [],
  loading: false,
  error: null,
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_TODO: {
      return {
        ...state,
        loading: true
      }
    }
    case actionTypes.FETCH_TODO_SUCCESS: {
      if (action.todos) {
        // Remove duplicates if any...
        const todos = [...new Map([...state.data, ...action.todos].map(obj => [obj.id, obj])).values()]

        return {
          ...state,
          loading: false,
          data: todos,
          error: null
        }
      } else {
        return {
          ...state,
          loading: false
        }
      }
    }
    case actionTypes.FETCH_TODO_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case actionTypes.ADD_TODO_SUCCESS: {
      return {
        ...state,
        data: [...state.data, action.todo],
        error: null
      }
    }
    case actionTypes.ADD_TODO_ERROR: {
      return {
        ...state,
        error: action.error
      }
    }

    case actionTypes.TOGGLE_TODO_SUCCESS: {
      return {
        ...state,
        data: action.todos,
        error: null
      }
    }
    case actionTypes.TOGGLE_TODO_ERROR: {
      return {
        ...state,
        error: action.error
      }
    }

    case actionTypes.DELETE_TODO_SUCCESS: {
      return {
        ...state,
        data: action.todos,
        error: null
      }
    }
    case actionTypes.DELETE_TODO_ERROR: {
      return {
        ...state,
        error: action.error
      }
    }

    default: {
      return state
    }
  }
}

export default todoReducer