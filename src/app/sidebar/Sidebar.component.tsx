import styled from 'styled-components';
import React from 'react';

import { Repo } from '../../interfaces';

export interface SidebarComponentProps {
  repos?: Array<Repo>;
}

const StyledSidebar = styled.div`
  background: #ddd;
  padding: 30px;
`;

const SidebarComponent: React.FC<SidebarComponentProps> = (props) => {
  return <StyledSidebar>
    {props.repos && props.repos.map((repo) => {
      return <div key={repo.id}>{repo.full_name}</div>;
    })}
  </StyledSidebar>;
};

export default SidebarComponent;