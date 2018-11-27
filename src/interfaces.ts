export interface RootState {
  readonly repos?: AsyncModel<Array<Repo>>;
  readonly repoDetails?: AsyncModel<RepoDetails>;
  readonly cache?: {
    [key: string]: RepoDetails
  }
}

export interface AsyncModel<P> {
  isFetching?: boolean;
  payload?: P;
}

// We only type what we need
export interface Repo {
  id: number;
  name: string;
  watchers_count: number;
}

export interface RepoDetails {
  details?: Repo;
  contributors?: RepoContributors;
}

export interface RepoContributors {
  list?: Array<Contributor>,
  hasMore?: string;
}

export interface Contributor {
  login: string;
}