// Act as a fake reducer.
export const auth = (state = {isAuthenticated: false}, action) => state

const reducers = {
  auth
}

export default reducers