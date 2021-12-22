import axios from "axios";

export const clientFirebase = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_DB_URL
})


const apiFirebase = {
  /**
   * Save the given list of todos in the firebase db.
   * @param {array} todos
   * @return {Promise<AxiosResponse<any>>}
   */
  saveTodos: (todos) => clientFirebase.put('todos.json', todos),
}


export default apiFirebase
