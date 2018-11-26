import React, { createElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';

import { fetchRepos } from '../../actions';
import { Repo, RootState } from '../../interfaces';
import withLoader from '../../withLoader';
import { getReposArraySelector, getReposIsFetching } from '../../rootReducer';

import ReposListComponent, { ReposListComponentProps } from './ReposList.component';

interface ContainerStateProps {
  repos?: Array<Repo>;
  isFetching?: boolean;
}

interface ContainerDispatchProps {
  onMount: () => void;
}

// Waiting for an official 'useRedux' hook, meanwhile good old connect
const ReposListContainer = connect<ContainerStateProps, ContainerDispatchProps>(
  (state: RootState) => ({
    repos: getReposArraySelector(state),
    isFetching: getReposIsFetching(state)
  }),
  (dispatch) => ({
    // Another approach would be to dispatch `appMounted` and make saga do all the logic, but this one is less boilerplate
    onMount: () => dispatch(fetchRepos.started())
  })
)((props: ContainerDispatchProps & ContainerStateProps) => {
  useEffect(props.onMount, []);

  return createElement(
    withLoader<ReposListComponentProps>(ReposListComponent), {
      repos: props.repos,
      isFetching: props.isFetching,
      // Make component completely dumb
      onClick: (repoName: string) => navigate(`/repo/${repoName}`)
    }
  );
});

export default ReposListContainer;
