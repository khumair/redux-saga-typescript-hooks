import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doSomething } from './actions';
import { RootState } from './interfaces';

interface ContainerStateProps {
  something?: string;
}

interface ContainerDispatchProps {
  onMount: () => void;
}

type Props = ContainerDispatchProps & ContainerStateProps;

const App = connect<ContainerStateProps, ContainerDispatchProps>(
  (state: RootState) => ({
    something: state.something
  }),
  (dispatch) => ({
    onMount: () => dispatch(doSomething('blabla'))
  })
)(
  class extends Component<Props> {
    componentDidMount() {
      this.props.onMount();
    }

    render() {
      return (
        <div className="App">
          app {this.props.something}
        </div>
      );
    }
  }
);

export default App;
