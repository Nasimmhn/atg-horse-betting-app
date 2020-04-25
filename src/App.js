import React from 'react'
// Styled-components
import styled from 'styled-components/macro'

// Components
import { GameSection } from './components/GameSection'


export const App = () => {
  return (
    <AppContainer>
      <Header> Header </Header>
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
  background: lightskyblue;
  display: grid;
  grid-template-rows: 100px auto 100px;
  grid-template-areas:
    "head"
    "main"
    "foot";
`
const Header = styled.header`
  grid-area: head;
  background: lightyellow;
`
const Main = styled.main`
  grid-area: main;
  padding-top: 20px;
  padding-bottom: 20px;
  background: lightgreen;
`
const Footer = styled.footer`
  grid-area: foot;
  background: lightslategray;
`
