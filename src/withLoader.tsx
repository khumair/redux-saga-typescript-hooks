import React, { ComponentType } from 'react';

interface WithLoaderProps {
  isFetching?: boolean;
}

function withLoader<P>(WrappedComponent: ComponentType<P>) {
  return function (props: P & WithLoaderProps) {
    const { isFetching, ...newProps } = props as WithLoaderProps;

    return isFetching
      ? <span>fetching...</span>
      : <WrappedComponent {...newProps}/>;
  }
}

export default withLoader;