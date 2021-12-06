import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import './App.css'
import { AddTodo, TodoList } from './components'

function App () {
  const params = useParams()

  return (
    <div id="app">
      <div className="container mx-auto px-4 pt-6">
        <AddTodo />
        <Routes>
          <Route path="/:filter" element={<TodoList params={params}/>}/>
          <Route path="*" element={<Navigate to="/all"/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
