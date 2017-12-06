import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import userEnhancer from './enhancers';

// eslint-disable-next-line no-mixed-operators
const composeEnhancers = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(userEnhancer)
    )
  );
};
