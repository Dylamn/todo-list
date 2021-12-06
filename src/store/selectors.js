import { createSelector } from "reselect";

export const filterSelector = (state, filter) => filter
export const todosSelector = (state) => state.todos

export const todosListSelector = createSelector(
  [todosSelector],
  todos => {
    return todos.data
  }
)

/**
 * Returns a filtered list of the state's to-dos.
 *
 * @type function(state: Object, filter: string)
 * @return array
 */
export const filteredTodosListSelector = createSelector(
  [todosListSelector, filterSelector],
  (todos, filter) => {
    if (!todos) {
      return
    }

    switch (filter) {
      case "done": {
        return todos.filter(t => t.done)
      }
      case "active": {
        return todos.filter(t => !t.done)
      }
      default: {
        return todos
      }
    }
  }
)
