import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { somethingAsync } from './actions';
import { RootState } from './interfaces';

interface ContainerStateProps {
  something?: string;
}

interface ContainerDispatchProps {
  onMount: () => void;
}

type Props = ContainerDispatchProps & ContainerStateProps;

const AppComponent: React.FC<Props> = (props) => {
  useEffect(props.onMount, []);

  return <div>{props.something}</div>;
};

// Waiting for an official 'useRedux' hook, meanwhile good old connect
const AppContainer = connect<ContainerStateProps, ContainerDispatchProps>(
  (state: RootState) => ({
    something: state.something
  }),
  (dispatch) => ({
    // Another approach would be to dispatch `appMounted` and make saga do all the logic, but this one is less boilerplate
    onMount: () => dispatch(somethingAsync)
  })
)(AppComponent);

export default AppContainer;
