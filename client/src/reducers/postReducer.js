import { ADD, DELETE, CROSS, SUBMIT_EDIT, SET_ITEMS } from '../actions/types';

const postReducer = (state = [], action) => {
  console.log(state, action)
  let newState = [...state];
  switch(action.type) {
    case ADD:
      // return Object.assign({}, state, {items: [...state.items, action.payload]});
      const newItem = Object.assign({}, action.payload, {crossed: false});
      return [...state, newItem];
    case DELETE:
      const idx = action.payload;
      const newArr = [...state].slice(0, idx).concat([...state].slice(idx + 1));
      return newArr;
    case CROSS:
      newState[action.payload].crossed = !newState[action.payload].crossed;
      return newState;
    case SUBMIT_EDIT:
      const updatedItem = Object.assign({}, newState[action.payload.index], action.payload.updatedItem);
      newState[action.payload.index] = updatedItem;
      console.log(newState);
      return newState;
    case SET_ITEMS:
      return action.payload;
    default:
      return state;
  }
}

export default postReducer;
