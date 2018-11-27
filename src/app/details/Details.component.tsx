import React from 'react';
import styled from 'styled-components';

import { Contributor, RepoContributors, RepoDetails } from '../../interfaces';

const StyledHeading = styled.h2`
  margin-top: 0;
`;

export interface DetailsComponentProps extends RepoDetails {
  onShowMore?: () => void;
}

interface ContributsListProps extends RepoContributors {
  onShowMore?: () => void;
}

const ContributorComponent: React.FC<Contributor> = ({ login }) => {
  return <div key={login}>{login}</div>;
};

const ContributorsList: React.FC<ContributsListProps> = ({ list = [], hasMore = false, onShowMore }) => {
  return <>
    <h4>Contributors</h4>
    {list.map(ContributorComponent)}
    {/*
    I don't like this functionality here, ideally we should create something like InfiniteScroller HOC
    */}
    {hasMore && hasMore.match(/next/) && <button onClick={onShowMore}>Show more</button>}
  </>;
};

const DetailsComponent: React.FC<DetailsComponentProps> = (props) => {
  if (!props.details || !props.details.name) {
    return null;
  }

  return <>
    <StyledHeading>{props.details && props.details.name}</StyledHeading>

    {props.contributors
    && props.contributors.list
    && props.contributors.list.length
    && <ContributorsList
      {...props.contributors}
      onShowMore={props.onShowMore}
    />}
  </>;
};

export default DetailsComponent;