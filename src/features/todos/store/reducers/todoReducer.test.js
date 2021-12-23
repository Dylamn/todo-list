import todoReducer, { initialState } from "./todoReducer";
import { createTodo } from "../../__test__/helpers";
import {
  ADD_TODO_ERROR,
  ADD_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  DELETE_TODO_SUCCESS,
  EDIT_TODO_ERROR,
  EDIT_TODO_SUCCESS,
  FETCH_TODO_ERROR,
  FETCH_TODO_SUCCESS,
  REQUEST_TODO,
  TOGGLE_EDIT_MODE
} from "../actions";

describe('test `todoReducer` reducer', function () {
  test('should return initialState', () => {
    expect(todoReducer(undefined, {})).toEqual(initialState)
  });

  test('should add a new todo', () => {
    const todo = createTodo("Add me")
    const action = {
      type: ADD_TODO_SUCCESS,
      todo
    }

    expect(todoReducer(initialState, action)).toEqual({
      data: [{...todo, editMode: false}],
      loading: false,
      error: null,
    })
  })
  test('should set an error when adding a new todo fails', () => {
    const error = new Error('add todo error')
    const action = {
      type: ADD_TODO_ERROR,
      error,
    }

    expect(todoReducer(initialState, action)).toEqual({
      data: [],
      loading: false,
      error
    })
  })

  test('should set loading to `true` when requesting todos', () => {
    expect.assertions(1)
    const action = {
      type: REQUEST_TODO
    }

    expect(todoReducer(initialState, action)).toEqual({
      data: [],
      loading: true,
      error: null
    })
  });
  test('should set todos data when fetching succeed', () => {
    expect.assertions(1)
    const todos = [createTodo("Hello"), createTodo("World")]
    const action = {
      type: FETCH_TODO_SUCCESS,
      todos
    }

    expect(todoReducer(initialState, action)).toEqual({
      data: todos,
      loading: false,
      error: null
    })
  });
  test('should set an error when fetching failed', () => {
    expect.assertions(1)
    const error = new Error('fetch error')
    const action = {
      type: FETCH_TODO_ERROR,
      error
    }
    expect(todoReducer(initialState, action)).toEqual({
      data: [],
      loading: false,
      error
    })
  });

  test('should edit the specified todo in the state', () => {
    const [todoToEdit, ...otherTodos] = [createTodo("Edit"), createTodo("Me"), createTodo("Today")]
    const editedTodo = {...todoToEdit, title: "You edited"}
    const state = {...initialState, data: [todoToEdit, otherTodos]}
    const action = {
      type: EDIT_TODO_SUCCESS,
      todo: editedTodo
    }

    expect(todoReducer(state, action).data).not.toContain(todoToEdit)
    expect(todoReducer(state, action)).toEqual({
      data: [editedTodo, otherTodos],
      loading: false,
      error: null,
    })
  });
  test('should set an error when saving an edited todo fails', () => {
    const error = new Error('edit todo error')
    const action = {
      type: EDIT_TODO_ERROR,
      error
    }

    expect(todoReducer(initialState, action)).toEqual({
      data: [],
      loading: false,
      error
    })
  });

  test('should delete the specified todo', () => {
    const [todoToDelete, todoNotToDelete] = [createTodo("Delete me"), createTodo("Not me")]
    const state = {...initialState, data: [todoToDelete, todoNotToDelete]}
    const action = {
      type: DELETE_TODO_SUCCESS,
      todos: [todoNotToDelete],
      // Can be a bit disappointing. We keep only the todos which we don't delete.
      // This is the action which is responsible to the deletion of the todo.
    }

    expect(todoReducer(state, action)).toEqual({
      data: [todoNotToDelete],
      loading: false,
      error: null,
    })
  });
  test('should set an error when deleting a todo fails', () => {
    const error = new Error('delete todo error')
    const action = {
      type: DELETE_TODO_ERROR,
      error
    }

    expect(todoReducer(initialState, action)).toEqual({
      data: [],
      loading: false,
      error,
    })
  });

  test('should toggle edit mode for the specified todo', () => {
    const [todoToEdit, todoNotToEdit] = [createTodo("Testing editMode toggle"), createTodo("Don't edit me")]
    const state = {...initialState, data: [todoToEdit, todoNotToEdit]}
    const action = {
      type: TOGGLE_EDIT_MODE,
      todo: todoToEdit
    }

    expect(todoReducer(state, action)).toEqual({
      data: [
        {...todoToEdit, editMode: true},
        todoNotToEdit
      ],
      loading: false,
      error: null
    })
  });
});