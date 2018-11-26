import { SagaIterator } from 'redux-saga';
import { all, call, select, takeLatest } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';

import { fetchRepoDetails, fetchRepos } from './actions';
import { RootState } from './interfaces';

// Very basic extended fetch only does requests to github API and always sends authorization header
function extendedFetch(url: RequestInfo, options?: RequestInit) {
  return fetch(`https://api.github.com${url}`, {
    ...options,
    headers: {
      Authorization: 'token 915fdcadb7ae496b2819fc604f9956363ae939eb'
    }
  });
}

const fetchReposWorker = bindAsyncAction(fetchRepos, { skipStartedAction: true })(
  function* (): SagaIterator {
    const response = yield call(extendedFetch, '/orgs/facebook/repos');
    return yield call([response, 'json']);
  }
);

const fetchRepoDetailsWorker = bindAsyncAction(fetchRepoDetails, { skipStartedAction: true })(
  function* (repoName): SagaIterator {
    const state: RootState = yield select();

    if (state && state.cache && state.cache[repoName]) {
      return state.cache[repoName];
    }

    // Do these requests in parallel
    // We could have taken the information about repo details from the list, but it's not future-proof
    const [repoResponse, contributorsResponse] = yield all([
      call(extendedFetch, `/repos/facebook/${repoName}`),
      call(extendedFetch, `/repos/facebook/${repoName}/contributors`)
    ]);

    // console.info(contributorsResponse.headers.get('Link'));

    const [repo, contributors] = yield all([
      call([repoResponse, 'json']),
      call([contributorsResponse, 'json']),
    ]);

    const repoDetails = {
      details: repo,
      contributors
    };

    return repoDetails;
  }
);

function* watchFetchRepos() {
  yield takeLatest(fetchRepos.started, fetchReposWorker);
}

function* watchFetchRepoDetails() {
  yield takeLatest(fetchRepoDetails.started, (action: Action<string>) => {
    return fetchRepoDetailsWorker(action.payload);
  });
}

export default function* rootSaga() {
  yield all([
    watchFetchRepos(),
    watchFetchRepoDetails()
  ]);
};