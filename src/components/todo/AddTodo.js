import { v4 as uuid } from 'uuid'
import { connect } from "react-redux";

import { tryAddTodo } from "../../store/actions";
import { useRef } from "react";

const AddTodo = ({tryAddTodo}) => {
  const refInput = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!refInput.current.value) {
      return
    }

    tryAddTodo({
      id: uuid(),
      title: refInput.current.value,
      done: false
    })

    e.target.reset()
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">Add a todo</h1>
      <hr className="w-full my-6" />
      <form className="flex flex-row" onSubmit={handleSubmit}>
        <input ref={refInput} type="text" name="todo_to_add" placeholder="Add your todo..."
               className="w-full rounded-md px-3 py-2 mr-2 sm:mr-10 bg-primary-variant focus:outline-none focus:ring" />
        <button
          type="submit"
          className="rounded-md px-6 py-2 bg-green-500 hover:bg-green-600 ring-green-300 focus:outline-none focus:ring">
          Add
        </button>
      </form>
      <hr className="w-full my-8" />
    </div>
  )
}
export default connect(null, {
  tryAddTodo
})(AddTodo)