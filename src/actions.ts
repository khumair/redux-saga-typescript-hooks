import actionCreatorFactory from 'typescript-fsa';
import { Repo, RepoDetails } from './interfaces';

const actionCreator = actionCreatorFactory();

export const fetchRepos = actionCreator.async<void, Array<Repo>>('REPOS_FETCH');
export const fetchRepoDetails = actionCreator.async<string, RepoDetails>('REPO_DETAILS_FETCH');