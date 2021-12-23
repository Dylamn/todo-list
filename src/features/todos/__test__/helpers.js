import { v4 as uuid } from "uuid";

/**
 * Create a todo.
 *
 * @param {string} title
 * @param {boolean} done
 * @return {{id: string, title: string, done: boolean}}
 */
export function createTodo (title , done = false) {
  return {
    id: uuid(),
    title: title,
    done,
    editMode: false,
  }
}
