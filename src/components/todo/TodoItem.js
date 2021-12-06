const TodoItem = ({todo, tryToggleTodo, tryDeleteTodo}) => (
  <li className="w-full flex flex-row border rounded px-3 py-2 my-3 justify-between items-center">
    <span className="text-lg">
      {todo.title}
    </span>
    <span className="flex items-center">
      <input onChange={() => tryToggleTodo(todo)}
             type="checkbox" name="done" checked={todo.done} className="mr-4 w-5 h-5" />

      <button onClick={() => tryDeleteTodo(todo)} type="submit"
              className="rounded px-3 py-2 bg-red-600 ring-red-300 hover:bg-red-700 focus:outline-none focus:ring">
        Delete
      </button>
    </span>
  </li>
)

export default TodoItem
