import { FILTER_TOGGLE } from '../actions/types';

import initialState from '../initialState';

const filtersReducer = (state = initialState.filters, action) => {
  console.log(state, action);
  let newState = [...state];
  switch(action.type) {
    case FILTER_TOGGLE:
      console.log('FILTER_TOGGLE');
      newState[action.payload].active = !newState[action.payload].active;
      return newState;
    default:
      return state;
  }
}

export default filtersReducer
