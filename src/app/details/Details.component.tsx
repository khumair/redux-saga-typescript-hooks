import React from 'react';
import { RouteComponentProps } from '@reach/router';

type DetailsProps = RouteComponentProps<{ repoId: string }>;

const Details: React.FC<DetailsProps> = (props) => {
  if (!props.repoId) {
    return null;
  }

  return <div>{props.repoId}</div>;
};

export default Details;