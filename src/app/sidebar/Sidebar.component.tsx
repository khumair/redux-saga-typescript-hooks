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

const SidebarComponent: React.FC<SidebarComponentProps> = () => {
  return <StyledSidebar>
    sidebar
  </StyledSidebar>;
};

export default SidebarComponent;