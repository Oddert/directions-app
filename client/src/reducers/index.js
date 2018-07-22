import { combineReducers } from 'redux';

import postReducer from './postReducer';
import counterReducer from './counterReducer';
import editReducer from './editReducer';
import filtersReducer from './filtersReducer';
import authReducer from './authReducer';

const dummyReducer = (state = {}, action) => {
  return state;
}

const rootReducer = combineReducers({
  items: postReducer,
  tyrel: dummyReducer,
  counter: counterReducer,
  edit: editReducer,
  filters: filtersReducer,
  auth: authReducer
});

// 'item' and 'tyrel' refer to parts of the state tree

export default rootReducer;
