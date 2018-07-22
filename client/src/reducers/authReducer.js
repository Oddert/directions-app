import { LOGIN, LOGOUT } from '../actions/types';

const authReducer = (state = {}, action) => {
  console.log(state, action);
  switch(action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
        lastCheck: new Date(),
        timeLoggedIn: new Date(),
        user: {
          username: action.payload.username
        }
      });
    case LOGOUT:
      return Object.assign({}, state, {
        loggedIn: false,
        lastCheck: new Date(),
        user: {}
      });
    default:
      return state;
  }
};

export default authReducer;
