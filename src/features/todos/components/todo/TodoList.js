import PropTypes from "prop-types";
import { todoType } from "../../../../types";

import Filter from "./Filter";
import TodoItem from './TodoItem'
import TodoEdit from "./TodoEdit";

const TodoList = ({todos, ...props}) => {
  return (
    <div id="card" className="mb-8">
      <div id="card-header"
           className="flex flex-col justify-center sm:flex-row rounded-t-md bg-primary-variant border-l border-r border-t p-4">
        <div id="card-title" className="my-auto text-xl font-bold">
          Todo List
        </div>
        <div className="flex justify-between mt-2 sm:mt-0 sm:ml-auto">
          <Filter />
        </div>
      </div>
      <div id="card-body" className="border-l border-r border-b rounded-b-sm p-4">
        <ul className="flex flex-col">
          {todos && todos.map(todo => todo.editMode ? (
            <TodoEdit
              key={todo.id} todo={todo}
              toggleEditMode={() => props.toggleEditMode(todo)}
              editTodo={todo => props.editTodo(todo)}
            />
          ) : (
            <TodoItem
              key={todo.id} todo={todo}
              editTodo={todo => props.editTodo(todo)}
              toggleEditMode={() => props.toggleEditMode(todo)}
              deleteTodo={() => props.deleteTodo(todo)}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(todoType),
  editTodo: PropTypes.func,
  toggleEditMode: PropTypes.func,
  deleteTodo: PropTypes.func,
}

export default TodoList