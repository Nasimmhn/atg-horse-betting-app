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
        <div style={{ textAlign: 'center' }}>Image: "Shake It Cerry", by <a href="https://omatg.se/media/#/images/shake-it-cerry-559459"> ATG.se </a>
        Licensed under  <a href="https://creativecommons.org/licenses/by/2.0/"> CC BY 2.0 </a>
        </div>
      </Main>
      <Footer>
        Nasim Mahzoun &copy; 2020
      </Footer>
    </AppContainer>
  )
}

const AppContainer = styled.div`
  margin: 0px;
  padding: 0px;
  min-height: 100vh;
  /* background: #094897; */
  display: grid;
  grid-template-rows: 0px auto 50px;
  grid-template-areas:
    "head"
    "main"
    "foot";
`
const Header = styled.header`
  grid-area: head;
  background: #094897;
`
const Main = styled.main`
  grid-area: main;
  background: white;
  background-image: url('./assets/shake_it_cerry.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: grid;
  grid-template-rows: auto 30px;
  grid-template-columns: 1fr;
  justify-content: center;

`
const Footer = styled.footer`
  grid-area: foot;
  background: #094897;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`
