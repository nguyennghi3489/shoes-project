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

const composedEnhancers = compose(
  applyMiddleware(...middleware)
)

export const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)