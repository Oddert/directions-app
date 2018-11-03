import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

import initialState from './initialState';
// import newPostReducer from './reducers/newPostReducer';

const middlewareInput = [thunk];

const middleware = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(
      applyMiddleware(...middlewareInput)
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  : compose(
      applyMiddleware(...middlewareInput)
    )

const store = createStore(
  rootReducer,
  initialState,
  middleware
)

export default store;
