// Act as a fake reducer.
export const authReducer = (state = {isAuthenticated: false}, action) => state

const reducers = {
  auth: authReducer
}

export default reducers
