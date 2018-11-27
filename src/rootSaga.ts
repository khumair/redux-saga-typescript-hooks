import { SagaIterator } from 'redux-saga';
import { all, call, select, takeLatest } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';

import { fetchMoreContributors, fetchRepoDetails, fetchRepos } from './actions';
import { RootState } from './interfaces';
import { getRepoContributorsSelector } from './rootReducer';
import { GITHUB_API_TOKEN } from './secrets';

// Very basic extended fetch only does requests to github API and always sends authorization header
function extendedFetch(url: RequestInfo, options?: RequestInit) {
  return fetch(`https://api.github.com${url}`, {
    ...options,
    headers: {
      Authorization: `token ${GITHUB_API_TOKEN}`
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
    const state: RootState = yield select() || {};

    if (state.cache && state.cache[repoName]) {
      return state.cache[repoName];
    }

    // Do these requests in parallel
    // We could have taken the information about repo details from the list, but it's not future-proof
    const [repoResponse, contributorsResponse] = yield all([
      call(extendedFetch, `/repos/facebook/${repoName}`),
      call(extendedFetch, `/repos/facebook/${repoName}/contributors`)
    ]);

    const [repo, contributors] = yield all([
      call([repoResponse, 'json']),
      call([contributorsResponse, 'json']),
    ]);

    return {
      details: repo,
      contributors: {
        list: contributors,
        hasMore: contributorsResponse.headers.get('Link')
      }
    };
  }
);

const fetchMoreContributorsWorker = bindAsyncAction(fetchMoreContributors, { skipStartedAction: true })(
  function* (): SagaIterator {
    const state: RootState = yield select() || {};
    const contributors = getRepoContributorsSelector(state);

    if (!contributors.hasMore) {
      return;
    }

    const tmp = contributors.hasMore.match(/<https:\/\/api\.github\.com([^<>]+)>; rel="next"/);
    const nextPageUrl = tmp && tmp[1];

    if (nextPageUrl) {
      const response = yield call(extendedFetch, nextPageUrl);
      const responseJson = yield call([response, 'json']);

      return {
        list: responseJson,
        hasMore: response.headers.get('Link')
      }
    }
  }
);

function* watchFetchMoreContributors() {
  yield takeLatest(fetchMoreContributors.started, fetchMoreContributorsWorker);
}

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
    watchFetchRepoDetails(),
    watchFetchMoreContributors()
  ]);
};