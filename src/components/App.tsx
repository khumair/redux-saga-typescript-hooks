import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Sidebar from './Sidebar';

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

function App() {
  return <>
    <GlobalStyle/>
    <StyledContainer>
      <Sidebar/>
    </StyledContainer>
  </>
}

export default App;
