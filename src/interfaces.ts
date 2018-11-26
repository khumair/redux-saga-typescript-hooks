export interface RootState {
  readonly repos?: AsyncModel<Array<Repo>>;
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