import React, { useEffect, useState } from 'react'

// Styled-components
import styled from 'styled-components/macro'

// Moment.js
import moment from 'moment'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// Styling of Material UI Expansion panel
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    padding: '0px'
  },
}))

export const Game = ({ gameId, title, betType }) => {
  const classes = useStyles();

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
        <Divider />
        {race &&
          <>
            <RaceGrid>
              <GridTitle>Number:</GridTitle> <div>{race.number}</div>
              <GridTitle>Race:</GridTitle> <div>{race.name}</div>
              <GridTitle>Start time:</GridTitle> <div>{moment(race.startTime).format("HH:MM")}</div>
            </RaceGrid>
            <Divider light />


            {race.starts.map(start => (
              <React.Fragment key={start.number}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography className={classes.heading}>
                      <StartGrid>
                        <GridHeader> No.</GridHeader>
                        <GridHeader> Horse </GridHeader>
                        <GridHeader> Driver </GridHeader>
                        <div>{start.number}</div>
                        <div>{start.horse.name}</div>
                        <div>{start.driver.firstName} {start.driver.lastName} </div>
                      </StartGrid>
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      <StartGrid>
                        <div></div>
                        <GridHeader> Horse father </GridHeader>
                        <GridHeader> Trainer </GridHeader>
                        <div></div>
                        <span>{start.horse.pedigree.father.name}</span>
                        <span>{start.horse.trainer.firstName} {start.horse.trainer.lastName}</span>

                      </StartGrid>
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </React.Fragment>
            ))}

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
  font-style: italic;
`
const StartGrid = styled.div`
  display: grid;
  grid-template-columns: 50px 150px auto;
  grid-gap: 10px;
`

const RaceGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 10px;
`
const GridTitle = styled.div`
  font-weight: bold;
  text-align: left;
`

const GridTextCenter = styled.div`
  text-align: center;
`

const GridHeader = styled.div`
  margin: 0px;
  padding: 0px;
  font-size: 0.7em;
  color: darkgray;
  font-weight: bold;
`

const RaceButton = styled.button`
  outline: none;
  border: 0px;
  border-left: 1px gray solid;
  border-right: 1px gray solid;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #094897;
  transform: skew(-30deg);
  && :hover{
    background: lightblue;
    cursor: pointer;
    border-bottom: #ffdd00 3px solid; 
  }
  && :focus{
    border-bottom: #ffdd00 3px solid; 
    transition-duration: 250ms;
  }
`
const RaceText = styled.span`
  color: white;
  font-size: 18px;
  transform: skew(30deg);
`
const InfoArea = styled.div`
  padding: 20px;
  box-sizing: border-box;
  width: 650px;
  background: lightblue;
`
const GameBar = styled.div`
  position: relative;
  width: 650px;
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