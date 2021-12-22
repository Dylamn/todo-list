import PropTypes from "prop-types";
import { todoType } from "../../../../types";
import { Formik } from "formik";

const TodoEdit = ({todo, editTodo, toggleEditMode}) => {
  const submit = (values, actions) => {
    editTodo({...todo, ...values, editMode: false})
    actions.setSubmitting(false)
  }

  return (
    <Formik onSubmit={submit} initialValues={{title: todo.title}}>
      {({
          handleSubmit,
          handleBlur,
          handleChange,
          values
        }) => (
        <li>
          <form onSubmit={handleSubmit}
                className="w-full flex flex-col sm:flex-row border rounded px-3 py-2 my-3 justify-between items-center">
            <input
              type="text" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur}
              autoFocus onFocus={e => e.target.select()}
              className="w-full text-lg bg-primary-variant sm:mr-3 px-2 py-1 rounded focus:ring focus:outline-none"
            />
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <button
                type="submit"
                className="rounded px-3 py-2 bg-green-600 ring-green-300 hover:bg-green-700 focus:outline-none focus:ring">
                Save
              </button>
              <button
                onClick={toggleEditMode} type="button"
                className="rounded px-3 py-2 bg-yellow-300 ring-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring">
                Cancel
              </button>
            </div>
          </form>
        </li>
      )}
    </Formik>
  )
}

TodoEdit.propTypes = {
  todo: todoType,
  editTodo: PropTypes.func,
  toggleEditMode: PropTypes.func,
}

export default TodoEdit