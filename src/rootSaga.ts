import { SagaIterator } from 'redux-saga';
import { all, call, takeLatest } from 'redux-saga/effects';

import { fetchRepos } from './actions';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';

const fetchReposWorker = bindAsyncAction(fetchRepos, { skipStartedAction: true })(
  function* (): SagaIterator {
    const response = yield call(fetch, 'https://api.github.com/orgs/facebook/repos');
    return yield call([response, 'json']);
  }
);

function* watchFetchRepos() {
  yield takeLatest(fetchRepos.started, fetchReposWorker);
}

export default function* rootSaga() {
  yield all([
    watchFetchRepos()
  ]);
};