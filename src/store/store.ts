import { History } from 'history';
import { createStore as createReduxStore, Store, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './reducers';
import { createSaga } from './sagas';

const composeEnhancers: any =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const { REACT_APP_LS_STATE } = process.env;

let initialState = {};

if (REACT_APP_LS_STATE === 'true') {
  const state = localStorage.getItem('state') || '';

  console.log(state);
  try {
    initialState = JSON.parse(state);
  } catch {}
}

export const createStore = (history: History) => {
  const sagaMiddleware = createSagaMiddleware();

  const store: Store = createReduxStore(
    reducer,
    initialState as any,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(createSaga(history));

  return store;
};
