import React from 'react';
import styled from 'styled-components';

import { Contributor, RepoDetails } from '../../interfaces';

export interface DetailsComponentProps extends RepoDetails {
}

const StyledHeading = styled.h2`
  margin-top: 0;
`;

const DetailsComponent: React.FC<DetailsComponentProps> = (props) => {
  function renderContributor(contributor: Contributor) {
    return <div key={contributor.login}>{contributor.login}</div>;
  }

  if (!props.details || !props.details.name) {
    console.info('return null');
    return null;
  }

  return <>
    <StyledHeading>{props.details && props.details.name}</StyledHeading>
    <h4>Contributors</h4>

    {props.contributors && props.contributors.map(renderContributor)}
  </>;
};

export default DetailsComponent;