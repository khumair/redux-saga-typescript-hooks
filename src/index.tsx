import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducer';
import rootSaga from './rootSaga';

import './index.css';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({});
const logger = createLogger({ collapsed: true });

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(logger, sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

import AppContainer from './App';

ReactDOM.render(
  <Provider store={store}>
    <AppContainer/>
  </Provider>,
  document.getElementById('root')
);