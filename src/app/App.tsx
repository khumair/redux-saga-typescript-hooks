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
  * {
    box-sizing: border-box;
  }
`;

const StyledContainer = styled.div`
  min-height: 100vh;
`;

const StyledSidebar = styled.div`
  min-width: 300px;
  background: #ddd;
  padding: 30px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
`;

const StyledContent = styled.div`
  margin-left: 300px;
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
