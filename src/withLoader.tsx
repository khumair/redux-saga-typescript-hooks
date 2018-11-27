import React, { ComponentType, FunctionComponent, useEffect, useState } from 'react';

interface WithLoaderProps {
  isFetching?: boolean;
}

const SHOW_LOADER_DELAY = 300;

function withLoader<P>(WrappedComponent: ComponentType<P>): FunctionComponent<P & WithLoaderProps> {
  return function (props: P & WithLoaderProps) {
    const { isFetching, ...newProps } = props as WithLoaderProps;

    const [isLoaderVisible, setLoaderVisible] = useState(false);

    useEffect(() => {
      let timer: NodeJS.Timer;

      // Only show loader if asynchronous task lasts longer than 300ms
      if (isFetching) {
        timer = setTimeout(() => {
          setLoaderVisible(true);
        }, SHOW_LOADER_DELAY);
      }

      return () => {
        clearTimeout(timer);
      };
    }, [isFetching]);

    return isLoaderVisible
      ? <span>loading...</span>
      : <WrappedComponent {...newProps}/>;
  }
}

export default withLoader;