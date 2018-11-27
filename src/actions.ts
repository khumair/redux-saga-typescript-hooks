import actionCreatorFactory from 'typescript-fsa';
import { Repo, RepoContributors, RepoDetails } from './interfaces';

const actionCreator = actionCreatorFactory();

export const fetchRepos = actionCreator.async<void, Array<Repo>>('FETCH_REPOS');
export const fetchRepoDetails = actionCreator.async<string, RepoDetails>('FETH_REPO_DETAILS');
export const fetchMoreContributors = actionCreator.async<void, RepoContributors>('FETCH_MORE_CONTRIBUTORS');