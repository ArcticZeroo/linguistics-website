import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './layout/Header';
import PageContent from './layout/PageContent';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 2rem);
  padding: 1rem;
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Header/>
        <PageContent/>
      </AppContainer>
    );
  }
}

export default App;
