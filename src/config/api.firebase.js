import axios from "axios";

export const clientFirebase = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_DB_URL
})


const apiFirebase = {
  /**
   * Returns the list of persistent todos in the Firebase database.
   *
   * @return {Promise<AxiosResponse<any>>}
   */
  fetchTodos: () => clientFirebase.get('todos.json'),
  /**
   * Save the given list of todos in the firebase db.
   *
   * @param {array} todos
   * @return {Promise<AxiosResponse<any>>}
   */
  saveTodos: (todos) => clientFirebase.put('todos.json', todos),
}


export default apiFirebase
