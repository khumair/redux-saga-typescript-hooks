import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { doSomething } from './actions';
import { RootState } from './interfaces';

const INITIAL_STATE: RootState = {
  something: ''
};

export const rootReducer = reducerWithInitialState(INITIAL_STATE)
  .case(doSomething, (state, something) => {
    return {
      ...state,
      something
    };
  });