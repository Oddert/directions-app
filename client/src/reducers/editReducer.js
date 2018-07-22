import { EDIT_TOGGLE } from '../actions/types';

const editReducer = (state = {}, action) => {
  switch(action.type) {
    case EDIT_TOGGLE:
      return Object.assign({}, state, {open: !state.open});
    default:
      return state;
  }
};

export default editReducer;
