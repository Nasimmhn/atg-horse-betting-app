import React, { useEffect, useState } from 'react'

// Styled-components
import styled from 'styled-components/macro'

// Moment.js
import moment from 'moment'


export const GameBar = ({ gameId, title, betType }) => {
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
    <div>
      <GameBarContainer>
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
      </GameBarContainer>

      <InfoArea>
        {/* Race number 
          - Race name 
          - Race start time 
          - Starts information (see below)
        For each start: 
          - Start number 
          - Horse name 
          - Driver/rider first name + last name 
          - Trainer first name + last name (expanded view) 
          - Name of the horse father (expanded view) */}
        <Title> {title}</Title>
        {race &&
          <>
            <Grid>
              <GridTitle>Number:</GridTitle>{race.number}
              <GridTitle>Race:</GridTitle> {race.name}
              <GridTitle>Start time:</GridTitle> {moment(race.startTime).format("HH:MM")}
            </Grid>
          </>
        }
      </InfoArea>
    </div>

  )
}
const Title = styled.h3`
  text-align: center;
  margin: 0px;
  padding: 5px;
  color: #094897;
  font-size: 30px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 10px;
`
const GridTitle = styled.span`
  font-weight: bold;
  text-align: right;
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
  width: 520px;
  height: 200px;
  background: lightblue;
`
const GameBarContainer = styled.div`
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