import React from 'react';
import styled from 'styled-components';

import { Repo } from '../../interfaces';

export interface ReposListComponentProps {
  selectedRepoName?: string;
  repos?: Array<Repo>;
  onClick: (repoId: string) => void;
}

const StyledRepo = styled.a`
  cursor: pointer;
  display: block;
  color: ${(p: { selected?: boolean }) => p.selected ? 'darkred' : 'blue'};
`;

const ReposListComponent: React.FC<ReposListComponentProps> = ({ repos, selectedRepoName, onClick }) => {
  function renderRepo(repo: Repo) {
    return <StyledRepo
      key={repo.id}
      onClick={() => onClick(repo.name)}
      selected={repo.name === selectedRepoName}
    >
      <strong>{repo.name}</strong> ({repo.watchers_count})
    </StyledRepo>;
  }

  return <>
    {repos && repos.map(renderRepo)}
  </>;
};

export default ReposListComponent;