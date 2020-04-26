import React, { useEffect, useState } from 'react'

// Styled-components
import styled from 'styled-components/macro'


export const GameItem = ({ game }) => {

  return (
    <GameContainer>
      <Item> {game.startTime} </Item>
    </GameContainer>

  )
}


const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: lightsteelblue;
`
const Item = styled.div`
  border: 1px solid black;
  background: red;
`