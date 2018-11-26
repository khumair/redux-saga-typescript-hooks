import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { somethingAsync } from '../actions';
import { RootState } from '../interfaces';

interface ContainerStateProps {
  something?: string;
}

interface ContainerDispatchProps {
  onMount: () => void;
}

type SidebarProps = ContainerDispatchProps & ContainerStateProps;

const StyledSidebar = styled.div`
  background: #ddd;
  padding: 30px;
`;

const SidebarComponent: React.FC<SidebarProps> = (props) => {
  useEffect(props.onMount, []);

  return <StyledSidebar>
    sidebar {props.something}
  </StyledSidebar>;
};

// Waiting for an official 'useRedux' hook, meanwhile good old connect
const Sidebar = connect<ContainerStateProps, ContainerDispatchProps>(
  (state: RootState) => ({
    something: state.something
  }),
  (dispatch) => ({
    // Another approach would be to dispatch `appMounted` and make saga do all the logic, but this one is less boilerplate
    onMount: () => dispatch(somethingAsync)
  })
)(SidebarComponent);

export default Sidebar;
