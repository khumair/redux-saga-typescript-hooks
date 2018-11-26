import React, { ComponentType, createElement, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchRepos } from '../actions';
import { AsyncModel, Repo, RootState } from '../interfaces';
import withLoader from '../withLoader';

interface ContainerStateProps {
  repos?: AsyncModel<Array<Repo>>;
}

interface ContainerDispatchProps {
  onMount: () => void;
}

interface SidebarComponentProps {
  repos?: Array<Repo>;
}

const StyledSidebar = styled.div`
  background: #ddd;
  padding: 30px;
`;

const SidebarComponent: React.FC<SidebarComponentProps> = () => {
  return <StyledSidebar>
    sidebar
  </StyledSidebar>;
};

// Waiting for an official 'useRedux' hook, meanwhile good old connect
const Sidebar = connect<ContainerStateProps, ContainerDispatchProps>(
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
    withLoader<SidebarComponentProps>(SidebarComponent), {
      repos: props.repos && props.repos.payload,
      isFetching: props.repos && props.repos.isFetching
    }
  );
});

export default Sidebar;
