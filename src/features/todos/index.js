import { Routes, Route } from 'react-router-dom'
import { AddTodo, TodoList } from './components'
import './store'

function Todos () {
  return (
    <div className="container mx-auto h-full px-4 pt-6">
    <AddTodo />
      <Routes>
        <Route path="" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default Todos;
