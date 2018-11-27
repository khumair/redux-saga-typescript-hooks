import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { sortBy } from 'lodash';
import { createSelector } from 'reselect' ;
import produce from 'immer';

import { fetchMoreContributors, fetchRepoDetails, fetchRepos } from './actions';
import { AsyncModel, Repo, RootState } from './interfaces';

const INITIAL_STATE: RootState = {
  repos: {},
  cache: {}
};

export const rootReducer = reducerWithInitialState(INITIAL_STATE)
  .case(fetchRepos.started, (state): RootState => {
    return {
      ...state,
      repos: {
        ...state.repos,
        isFetching: true
      }
    };
  })
  .case(fetchRepos.done, (state, { result }: any): RootState => {
    return {
      ...state,
      repos: {
        payload: result,
        isFetching: false
      }
    };
  })
  .case(fetchRepoDetails.started, (state): RootState => {
    return {
      ...state,
      repoDetails: {
        ...state.repoDetails,
        isFetching: true
      }
    }
  })
  .case(fetchRepoDetails.done, (state, payload): RootState => {
    const { details } = payload.result;

    return produce<RootState>(state, draft => {
      if (draft.repoDetails) {
        draft.repoDetails.isFetching = false;
        draft.repoDetails.payload = payload.result;
        if (draft.cache && details) {
          draft.cache[details.name] = payload.result;
        }
      }
    });
  })
  .case(fetchMoreContributors.done, (state, payload): RootState => {
    const { list, hasMore } = payload.result;

    return produce<RootState>(state, draft => {
      const contributors = getRepoContributorsSelector(draft);
      const updatedList = [
        ...contributors.list || [],
        ...list || []
      ];
      contributors.list = updatedList;
      contributors.hasMore = hasMore;

      const repoName = getRepoDetailsNameSelector(draft);
      console.info(repoName);

      if (draft.cache && draft.cache[repoName]) {
        draft.cache[repoName].contributors = contributors;
      }
    });
  });

function getReposSelector(state: RootState): AsyncModel<Array<Repo>> | undefined {
  return state.repos;
}

export const getReposArraySelector = createSelector(
  getReposSelector,
  repos => repos && repos.payload && sortBy(repos.payload, e => -e.watchers_count)
);

export const getReposIsFetchingSelector = createSelector(
  getReposSelector,
  repos => repos && repos.isFetching
);

export const getRepoDetailsSelector = (state: RootState) => state.repoDetails;

export const getRepoContributorsSelector = createSelector(
  getRepoDetailsSelector,
  details => details && details.payload && details.payload.contributors || {}
);

export const getRepoDetailsNameSelector = createSelector(
  getRepoDetailsSelector,
  details => details && details.payload && details.payload.details && details.payload.details.name || ''
);