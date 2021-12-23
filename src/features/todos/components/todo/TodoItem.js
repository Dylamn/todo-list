import PropTypes from "prop-types";
import { todoType } from "../../types";

const TodoItem = ({todo, toggleEditMode, editTodo, deleteTodo}) => {
  const handleEditClick = e => {
    e.stopPropagation()
    toggleEditMode()
  }

  return (
    <li className="w-full flex flex-col sm:flex-row border rounded px-3 py-2 my-3 justify-between items-center">
    <span className="text-lg">
      {todo.title}
    </span>
      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
        <input onChange={() => editTodo({...todo, done: !todo.done})}
               type="checkbox" name="done" checked={todo.done} className="mr-4 w-5 h-5" />

        <button onClick={handleEditClick}
                className="rounded px-3 py-2 bg-green-600 ring-green-300 hover:bg-green-700 focus:outline-none focus:ring">
          Edit
        </button>
        <button onClick={() => deleteTodo(todo)} type="submit"
                className="rounded px-3 py-2 bg-red-600 ring-red-300 hover:bg-red-700 focus:outline-none focus:ring">
          Delete
        </button>
      </div>
    </li>
  )
}

TodoItem.propTypes = {
  todo: todoType,
  editTodo: PropTypes.func,
  toggleEditMode: PropTypes.func,
  deleteTodo: PropTypes.func
}

export default TodoItem
