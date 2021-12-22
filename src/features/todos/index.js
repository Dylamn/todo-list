import { Route, Routes, useLocation } from 'react-router-dom'
import { AddTodo, TodoList } from './components'
import './store'
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodoAction,
  toggleEditModeAction,
  tryAddTodoAction,
  tryDeleteTodoAction,
  tryEditTodoAction
} from "./store/actions";
import { useEffect } from "react";
import { filteredTodosListSelector } from "./store/selectors";

const Todos = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const todos = useSelector(
    (state) => filteredTodosListSelector(state, searchParams.get('filter'))
  )

  useEffect(() => {
    dispatch(fetchTodoAction())
  }, [dispatch])

  const tryAddTodo = (todo) => {
    dispatch(tryAddTodoAction(todo))
  }
  const toggleEditMode = (todo) => {
    dispatch(toggleEditModeAction(todo))
  }
  const tryEditTodo = (todo) => {
    dispatch(tryEditTodoAction(todo))
  }
  const tryDeleteTodo = (todo) => {
    dispatch(tryDeleteTodoAction(todo))
  }

  return (
    <div className="container mx-auto h-full px-4 pt-6">
      <AddTodo addTodo={tryAddTodo} />
      <Routes>
        <Route
          path=""
          element={
            <TodoList
              todos={todos}
              toggleEditMode={toggleEditMode}
              editTodo={tryEditTodo}
              deleteTodo={tryDeleteTodo}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Todos;
