import * as actionTypes from "../actions";

const initialState = {
  data: [],
  loading: false,
  error: null,
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_EDIT_MODE: {
      return {
        ...state,
        data: state.data.map(t => t.id === action.todo.id ? {...t, editMode: !t.editMode} : t)
      }
    }
    case actionTypes.REQUEST_TODO: {
      return {
        ...state,
        loading: true
      }
    }
    case actionTypes.FETCH_TODO_SUCCESS: {
      if (action.todos) {
        // Remove duplicates if any...
        const todos = [
          ...new Map([...state.data, ...action.todos].map(
            obj => [obj.id, {...obj, editMode: false}]
          )).values()
        ]

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
    case actionTypes.ADD_TODO_SUCCESS: {
      return {
        ...state,
        data: [...state.data, {...action.todo, editMode: false}],
        loading: false,
        error: null,
      }
    }

    case actionTypes.EDIT_TODO_SUCCESS: {
      return {
        ...state,
        data: state.data.map(t => t.id === action.todo.id ? action.todo : t),
        loading: false,
        error: null,
      }
    }
    case actionTypes.DELETE_TODO_SUCCESS: {
      return {
        ...state,
        data: action.todos,
        loading: false,
        error: null,
      }
    }
    case actionTypes.FETCH_TODO_ERROR:
    case actionTypes.ADD_TODO_ERROR:
    case actionTypes.EDIT_TODO_ERROR:
    case actionTypes.DELETE_TODO_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    }
    default: {
      return state
    }
  }
}

export default todoReducer