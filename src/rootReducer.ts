import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { sortBy } from 'lodash';

import { fetchRepos } from './actions';
import { AsyncModel, Repo, RootState } from './interfaces';
import { createSelector } from 'reselect';

const INITIAL_STATE: RootState = {
  repos: {
    isFetching: true
  }
};

export const rootReducer = reducerWithInitialState(INITIAL_STATE)
  .case(fetchRepos.started, (state) => {
    return {
      ...state,
      repos: {
        ...state.repos,
        isFetching: true
      }
    };
  })
  .case(fetchRepos.done, (state, { result }: any) => {
    return {
      ...state,
      repos: {
        payload: result,
        isFetching: false
      }
    };
  });

function getReposSelector(state: RootState): AsyncModel<Array<Repo>> | undefined {
  return state.repos;
}

export const getReposArraySelector = createSelector(
  getReposSelector,
  repos => repos && repos.payload && sortBy(repos.payload, e => -e.watchers_count)
);

export const getReposIsFetching = createSelector(
  getReposSelector,
  repos => repos && repos.isFetching
);