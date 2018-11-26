import React from 'react';
import styled from 'styled-components';

import { Repo } from '../../interfaces';

export interface ReposListComponentProps {
  repos?: Array<Repo>;
  onClick: (repoId: string) => void;
}

const StyledRepo = styled.a`
  cursor: pointer;
  display: block;
  color: blue;
`;

const ReposListComponent: React.FC<ReposListComponentProps> = ({ repos, onClick }) => {
  return <>
    {repos && repos.map((repo) => {
      return <StyledRepo
        key={repo.id}
        onClick={() => onClick(repo.name)}
      >
        <strong>{repo.name}</strong> ({repo.watchers_count})
      </StyledRepo>;
    })}
  </>;
};

export default ReposListComponent;