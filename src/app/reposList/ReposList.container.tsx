import React, { createElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';

import { fetchRepos } from '../../actions';
import { Repo, RootState } from '../../interfaces';
import withLoader from '../../withLoader';
import { getRepoDetailsNameSelector, getReposArraySelector, getReposIsFetchingSelector } from '../../rootReducer';

import ReposListComponent, { ReposListComponentProps } from './ReposList.component';

interface ContainerStateProps {
  repos?: Array<Repo>;
  isFetching?: boolean;
  selectedRepoName?: string;
}

interface ContainerDispatchProps {
  onMount: () => void;
}

// Waiting for an official 'useRedux' hook, meanwhile good old connect
const ReposListContainer = connect<ContainerStateProps, ContainerDispatchProps>(
  (state: RootState) => ({
    selectedRepoName: getRepoDetailsNameSelector(state),
    repos: getReposArraySelector(state),
    isFetching: getReposIsFetchingSelector(state)
  }),
  (dispatch) => ({
    // Another approach would be to dispatch `appMounted` and make saga do all the logic, but this one is less boilerplate
    onMount: () => dispatch(fetchRepos.started())
  })
)((props: ContainerDispatchProps & ContainerStateProps) => {
  useEffect(props.onMount, []);

  return createElement(
    withLoader<ReposListComponentProps>(ReposListComponent), {
      ...props,
      // Make component completely dumb
      onClick: (repoName: string) => navigate(`/repo/${repoName}`)
    }
  );
});

export default ReposListContainer;
