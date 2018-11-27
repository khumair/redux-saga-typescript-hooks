import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducer';
import rootSaga from './rootSaga';

import App from './app/App';

// Disable native scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

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

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);