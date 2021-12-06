import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Filter from "./Filter";
import TodoItem from './TodoItem'
import { fetchTodo, tryDeleteTodo, tryToggleTodo } from "../../store/actions";
import { filteredTodosListSelector } from "../../store/selectors";
import withRouter from "../hoc/withRouter";

const TodoList = ({todos, fetchTodo, tryToggleTodo, tryDeleteTodo}) => {
  useEffect(() => {
    fetchTodo()
  }, [fetchTodo])

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
          {todos.length > 0 && todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} tryToggleTodo={tryToggleTodo} tryDeleteTodo={tryDeleteTodo} />
          ))}
        </ul>
      </div>
    </div>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array,
  fetchTodo: PropTypes.func,
  tryToggleTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
}

export default withRouter(
  connect((state, ownProps) => {
    const filter = ownProps.params.filter

    return {
      todos: filteredTodosListSelector(state, filter)
    }
  }, {
    fetchTodo,
    tryToggleTodo,
    tryDeleteTodo,
  })(TodoList)
)

