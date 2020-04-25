import React from 'react'
// Styled-components
import styled from 'styled-components/macro'

// Components
import { Input } from './components/Input'


export const App = () => {
  return (
    <AppContainer>
      <Header> Header </Header>
      <MainContainer >
        <Input />
      </MainContainer >
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
const Footer = styled.footer`
  grid-area: foot;
  background: lightslategray;
`

const MainContainer = styled.main`
  grid-area: main;
  padding-top: 50px;
  background: lightgreen;

  
`
