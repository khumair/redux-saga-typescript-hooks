import React from 'react';
import styled from 'styled-components';

import { Repo } from '../../interfaces';

export interface ReposListComponentProps {
  repos?: Array<Repo>;
  onClick: (repoId: number) => void;
}

const StyledRepo = styled.a`
  cursor: pointer;
  display: block;
  color: blue;
  text-decoration: underline;
`;

const ReposListComponent: React.FC<ReposListComponentProps> = ({ repos, onClick }) => {
  return <>
    {repos && repos.map((repo) => {
      return <StyledRepo
        key={repo.id}
        onClick={() => onClick(repo.id)}
      >
        {repo.name} ({repo.watchers_count})
      </StyledRepo>;
    })}
  </>;
};

export default ReposListComponent;