import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { fetchRepos } from './actions';
import { RootState } from './interfaces';

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