import { SagaIterator } from 'redux-saga';
import { all, call, takeLatest } from 'redux-saga/effects';

import { somethingAsync } from './actions';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';

const doSomethingWorker = bindAsyncAction(somethingAsync, { skipStartedAction: true })(
  function* (): SagaIterator {
    const response = yield call(fetch, 'https://jsonplaceholder.typicode.com/todos/1');
    return yield call([response, 'json']);
  }
);

function* watchSomething() {
  yield takeLatest(somethingAsync.type, doSomethingWorker);
}

export default function* rootSaga() {
  yield all([
    watchSomething()
  ]);
};