import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Router } from '@reach/router';

import ReposList from './reposList/ReposList.container';
import Details from './details/Details.container';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
`;

const StyledSidebar = styled.div`
  min-width: 300px;
  background: #ddd;
  padding: 30px;
`;

const StyledContent = styled.div`
  padding: 30px;
`;

function App() {
  return <>
    <GlobalStyle/>
    <StyledContainer>
      <StyledSidebar>
        <ReposList/>
      </StyledSidebar>
      <StyledContent>
        <Router primary={false}>
          <Details path="/repo/:repoName"/>
        </Router>
      </StyledContent>
    </StyledContainer>
  </>
}

export default App;
