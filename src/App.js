import React from 'react'
// Styled-components
import styled from 'styled-components/macro'

// Components
import { GameSection } from './components/GameSection'


export const App = () => {
  return (
    <AppContainer>
      <Header />
      <Main>
        <GameSection />
      </Main>
      <Footer> Footer </Footer>
    </AppContainer>
  )
}

const AppContainer = styled.div`
  margin: 0px;
  padding: 0px;
  min-height: 100vh;
  background: #094897;
  display: grid;
  grid-template-rows: 0px auto 50px;
  grid-template-areas:
    "head"
    "main"
    "foot";
`
const Header = styled.header`
  grid-area: head;
`
const Main = styled.main`
  margin-top: 20px;
  margin-bottom: 20px;
  grid-area: main;
`
const Footer = styled.footer`
  grid-area: foot;
`
