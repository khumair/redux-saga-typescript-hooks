import React, { createElement, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';

import { AsyncModel, RepoDetails, RootState } from '../../interfaces';
import { fetchMoreContributors, fetchRepoDetails } from '../../actions';
import withLoader from '../../withLoader';

import DetailsComponent, { DetailsComponentProps } from './Details.component';
import { getRepoContributorsSelector, getRepoDetailsSelector } from '../../rootReducer';

interface ContainerStateProps {
  details?: AsyncModel<RepoDetails>;
  isFetching?: boolean;
}

interface ContainerDispatchProps {
  onRepoChange: (repoName: string) => void;
  onShowMore: () => void;
}

type ContainerProps = ContainerStateProps & ContainerDispatchProps & RouteComponentProps<{ repoName: string }>;

const DetailsContainer = connect<ContainerStateProps, ContainerDispatchProps>(
  (state: RootState) => ({
    details: getRepoDetailsSelector(state),
    contributors: getRepoContributorsSelector(state)
  }),
  (dispatch) => ({
    onShowMore: () => dispatch(fetchMoreContributors.started()),
    onRepoChange: (repoName: string) => dispatch(fetchRepoDetails.started(repoName))
  })
)((props: ContainerProps) => {
  useEffect(() => {
    if (props.repoName) {
      props.onRepoChange(props.repoName);
      // Always scroll to top when opening new page
      window.requestAnimationFrame(() => window.scrollTo(0, 0));
    }
  }, [props.repoName]);

  return createElement(
    withLoader<DetailsComponentProps>(DetailsComponent), {
      ...(props.details || {}).payload,
      onShowMore: props.onShowMore,
      isFetching: props.details && props.details.isFetching
    }
  );
});

export default DetailsContainer;