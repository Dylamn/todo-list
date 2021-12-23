import PropTypes from 'prop-types'
import { todoType } from '../../types'
import { Form, Formik, useField } from 'formik'

const TodoInput = ({label, ...props}) => {
  const [field, meta] = useField(props)

  return (
    <>
      {label && <label>{label}</label>}
      <input
        className="w-full text-lg bg-primary-variant sm:mr-3 px-2 py-1 rounded focus:ring focus:outline-none"
        {...field} {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </>
  )
}

const TodoEdit = ({todo, editTodo, toggleEditMode}) => {

  const submit = (values, actions) => {
    editTodo({...todo, ...values, editMode: false})
    actions.setSubmitting(false)
  }

  return (
    <li>
      <Formik initialValues={{title: todo.title}} onSubmit={submit}>
        {({
            isSubmitting, values,
            handleChange, handleBlur, handleSubmit,
          }) => (
          <Form className="w-full flex flex-col sm:flex-row border rounded px-3 py-2 my-3 justify-between items-center">
            <TodoInput name="title" type="text" autoFocus onFocus={e => e.target.select()} />

            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <button
                type="submit" disabled={isSubmitting}
                className="rounded px-3 py-2 bg-green-600 ring-green-300 hover:bg-green-700 focus:outline-none focus:ring">
                Save
              </button>
              <button
                onClick={toggleEditMode} type="button"
                className="rounded px-3 py-2 bg-yellow-300 ring-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring">
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </li>
  )
}

TodoEdit.propTypes = {
  todo: todoType,
  editTodo: PropTypes.func,
  toggleEditMode: PropTypes.func,
}

export default TodoEdit