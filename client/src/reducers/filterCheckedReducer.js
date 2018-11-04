import { TOGGLE_FILTER_CHECKED } from '../actions/types';

const counterReducer = (state = false, action) => {
  switch(action.type) {
    case TOGGLE_FILTER_CHECKED:
      return !state
    default:
      return state
  }
}

export default counterReducer
