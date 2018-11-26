import React from 'react';
import { Link } from '@reach/router';

import { Repo } from '../../interfaces';

export interface ReposListComponentProps {
  repos?: Array<Repo>;
}

const ReposListComponent: React.FC<ReposListComponentProps> = (props) => {
  return <>
    {props.repos && props.repos.map((repo) => {
      return <div key={repo.id}>
        <Link to={`repo/${repo.id}`}>
          {repo.full_name}
        </Link>
      </div>;
    })}
  </>;
};

export default ReposListComponent;