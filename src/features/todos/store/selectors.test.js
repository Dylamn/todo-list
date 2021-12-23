import { todosSelector, todosListSelector, filteredTodosListSelector } from "./selectors";
import { createTodo } from "../__test__/helpers";

describe('test todos selectors', function () {
  test('should return todos state', () => {
    expect.assertions(1)
    const initialState = {
      todos: {
        data: [],
        loading: false,
        error: null,
      },
      auth: {
        isLoggedIn: false,
      }
    }

    expect(todosSelector(initialState)).toEqual({
      data: [],
      loading: false,
      error: null,
    })
  });

  test('should return todos list', () => {
    expect.assertions(1)
    const todo = createTodo('Hello world!')
    const initialState = {
      todos: {
        data: [todo],
        loading: false,
        error: null,
      },
      auth: {
        isLoggedIn: false,
      }
    }

    expect(todosListSelector(initialState)).toEqual([todo])
  });

  test("should return list with only the 'done' todos", () => {
    expect.assertions(2)
    const [todoNotDone, todoDone] = [createTodo("Hello"), createTodo("World", true)]
    const initialState = {
      todos: {
        data: [todoNotDone, todoDone],
        loading: false,
        error: null,
      },
      auth: {
        isLoggedIn: false,
      }
    }

    expect(filteredTodosListSelector(initialState, "done")).toEqual([todoDone])
    expect(filteredTodosListSelector(initialState, "done")).not.toContainEqual([todoNotDone])
  });
});
