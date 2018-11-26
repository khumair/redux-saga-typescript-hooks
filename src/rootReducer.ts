import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { somethingAsync } from './actions';
import { RootState } from './interfaces';

const INITIAL_STATE: RootState = {
  something: ''
};

export const rootReducer = reducerWithInitialState(INITIAL_STATE)
  .case(somethingAsync.done, (state, { result }: any) => {
    return {
      ...state,
      something: result.title
    };
  });