import React, { useEffect, useState } from 'react'

// Styled-components
import styled from 'styled-components/macro'

// Moment.js
import moment from 'moment'


export const Game = ({ gameId, title, betType }) => {
  const [gameData, setGameData] = useState(null)
  const [race, setRace] = useState(null)

  useEffect(() => {
    fetch(`https://www.atg.se/services/racinginfo/v1/api/games/${gameId}`)
      .then((res) => res.json())
      .then((json) => {
        setGameData(json)
        setRace(json.races[0])
      })

  }, [gameId])

  const handleClick = (value) => {
    setRace(gameData.races.filter(item => item.id === value)[0])
  }

  return (
    <>
      <GameBar>
        {gameData &&
          <>
            <BetType><BetText>{betType}</BetText></BetType>
            {gameData.races.map(race => (
              <RaceButton key={race.id} onClick={(e) => handleClick(race.id)}>
                <RaceText>{race.number}</RaceText>
              </RaceButton>
            ))}
          </>
        }
      </GameBar>

      <InfoArea>
        <Title> {title}</Title>
        <hr />
        {race &&
          <>
            <RaceGrid>
              <GridTitle>Number:</GridTitle> <div>{race.number}</div>
              <GridTitle>Race:</GridTitle> <div>{race.name}</div>
              <GridTitle>Start time:</GridTitle> <div>{moment(race.startTime).format("HH:MM")}</div>
            </RaceGrid>
            <hr />
            <StartGrid>
              <GridHeader>Number</GridHeader>
              <GridHeader>Horse</GridHeader>
              <GridHeader>Driver</GridHeader>
              <GridHeader>Trainer</GridHeader>
              <GridHeader>Horse father</GridHeader>
              {race.starts.map(start => (
                <React.Fragment key={start.number}>
                  <GridTextCenter>{start.number}</GridTextCenter>
                  <div>{start.horse.name}</div>
                  <div>{start.driver.firstName} {start.driver.lastName} </div>
                  <div>{start.horse.trainer.firstName} {start.horse.trainer.lastName}</div>
                  <div>{start.horse.pedigree.father.name}</div>

                </React.Fragment>
              ))}
            </StartGrid>
          </>
        }
      </InfoArea>
    </>

  )
}
const Title = styled.h3`
  text-align: center;
  margin: 0px;
  padding: 5px;
  color: #094897;
  font-size: 30px;
`
const StartGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 10px;
`

const RaceGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 10px;
`
const GridTitle = styled.div`
  font-weight: bold;
  text-align: right;
`

const GridTextCenter = styled.div`
  text-align: center;
`

const GridHeader = styled.div`
  color: black;
  font-weight: bold;
  text-align: left;
`

const RaceButton = styled.button`
  outline: none;
  padding: 0px;
  border: 0px;
  border-left: 1px gray solid;
  border-right: 1px gray solid;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #094897;
  transform: skew(-30deg);
  && :hover, :focus{
    background: lightblue;
  }
`
const RaceText = styled.span`
  color: white;
  font-size: 18px;
  transform: skew(30deg);
`
const InfoArea = styled.div`
  padding: 10px;
  box-sizing: border-box;
  width: 520px;
  background: lightblue;
`
const GameBar = styled.div`
  position: relative;
  width: 520px;
  height: 50px;
  justify-content: flex-start;
  display: grid;
  grid-template-columns: 75px repeat(7, 1fr);
  left: 14px;
`
const BetType = styled.div`
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #094897;
  transform: skew(-30deg);
`

const BetText = styled.span`
  color: #ffdd00;
  font-size: 30px;
  transform: skew(30deg);
`