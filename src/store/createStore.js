//@flow
import { applyMiddleware, createStore as reduxCreateStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers'

const logger = createLogger();

export default function createStore() {
  const middleware = [thunk];
  if (__DEV__) {
    middleware.push(logger);
  }
  const store = reduxCreateStore(reducers, applyMiddleware(...middleware));
  return store;
}
