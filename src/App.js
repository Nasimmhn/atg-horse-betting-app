import React from 'react'
// Styled-components
import styled from 'styled-components/macro'

// From Components
import { Input } from './components/Input'




export const App = () => {
  return (
    <MainContainer >
      <Input />
    </MainContainer >
  )
}


const MainContainer = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  
`
