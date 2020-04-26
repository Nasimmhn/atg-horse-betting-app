import React, { useEffect, useState } from 'react'

// Styled-components
import styled from 'styled-components/macro'

// Components
import { GameItem } from './GameItem.js'

const getGame = (data) => {
  // Return upcoming games array if exists and is not empty, else return results
  if (data.upcoming && data.upcoming.length !== 0) {
    return { gameList: data.upcoming, title: "Upcoming games" }
  } else {
    return { gameList: data.results, title: "Previous game results" }
  }
}


export const GameInfo = ({ data }) => {

  console.log("data", data)

  let { gameList, title } = getGame(data)

  return (
    <InfoContainer>
      <BetType> {data.betType} </BetType>
      <Title> {title} </Title>
      {gameList.map(game => (
        <GameItem key={game.id} game={game} />
      ))}
      <Upcoming> </Upcoming>
    </InfoContainer>
  )
}


const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: lightsteelblue;
`

const BetType = styled.h1`

`

const Title = styled.h2`

`
const Results = styled.div`
  height: 100px;
  width: 100px;
  background: violet;
`
const Upcoming = styled.div`
  height: 100px;
  width: 100px;
  background: lightseagreen;
`

