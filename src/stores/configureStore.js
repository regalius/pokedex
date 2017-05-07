import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(rootReducer, composeWithDevTools(
      applyMiddleware(sagaMiddleware))),
    runSaga: sagaMiddleware.run(rootSaga)
  };
};

export default configureStore;
