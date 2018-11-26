import React, { createElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';

import { fetchRepos } from '../../actions';
import { AsyncModel, Repo, RootState } from '../../interfaces';
import withLoader from '../../withLoader';

import ReposListComponent, { ReposListComponentProps } from './ReposList.component';

interface ContainerStateProps {
  repos?: AsyncModel<Array<Repo>>;
}

interface ContainerDispatchProps {
  onMount: () => void;
}

// Waiting for an official 'useRedux' hook, meanwhile good old connect
const ReposListContainer = connect<ContainerStateProps, ContainerDispatchProps>(
  (state: RootState) => ({
    repos: state.repos
  }),
  (dispatch) => ({
    // Another approach would be to dispatch `appMounted` and make saga do all the logic, but this one is less boilerplate
    onMount: () => dispatch(fetchRepos.started())
  })
)((props: ContainerDispatchProps & ContainerStateProps) => {
  useEffect(props.onMount, []);

  return createElement(
    withLoader<ReposListComponentProps>(ReposListComponent), {
      // Optional chaining when?
      repos: props.repos && props.repos.payload,
      isFetching: props.repos && props.repos.isFetching,
      // Make component completely dumb
      onClick: (repoId: number) => navigate(`/repo/${repoId}`)
    }
  );
});

export default ReposListContainer;
