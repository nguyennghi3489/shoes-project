import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers'

export const history = createHistory()

const initialState = {}
const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
//     applyMiddleware(...middleware)
// ));

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

// const composedEnhancers = compose(
//   applyMiddleware(...middleware)
// )

export const store = createStore(
  rootReducer,
  initialState,
  enhancer,
)