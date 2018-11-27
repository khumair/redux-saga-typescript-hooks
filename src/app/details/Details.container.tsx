import React, { createElement, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';

import { AsyncModel, RepoDetails, RootState } from '../../interfaces';
import { fetchRepoDetails } from '../../actions';
import withLoader from '../../withLoader';

import DetailsComponent from './Details.component';

interface ContainerStateProps {
  details?: AsyncModel<RepoDetails>;
  isFetching?: boolean;
}

interface ContainerDispatchProps {
  onRepoChange: (repoName: string) => void;
}

type ContainerProps = ContainerStateProps & ContainerDispatchProps & RouteComponentProps<{ repoName: string }>;

const DetailsContainer = connect<ContainerStateProps, ContainerDispatchProps>(
  (state: RootState) => ({
    details: state.repoDetails
  }),
  (dispatch) => ({
    onRepoChange: (repoName: string) => dispatch(fetchRepoDetails.started(repoName))
  })
)((props: ContainerProps) => {
  useEffect(() => {
    if (props.repoName) {
      props.onRepoChange(props.repoName);
    }
  }, [props.repoName]);

  return createElement(
    withLoader<RepoDetails>(DetailsComponent), {
      ...(props.details || {}).payload,
      isFetching: props.details && props.details.isFetching
    }
  );
});

export default DetailsContainer;