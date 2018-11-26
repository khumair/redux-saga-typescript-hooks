import actionCreatorFactory from 'typescript-fsa';
import { Repo } from './interfaces';

const actionCreator = actionCreatorFactory();

export const fetchRepos = actionCreator.async<void, Array<Repo>>('REPOS_FETCH');