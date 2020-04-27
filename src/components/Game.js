import React, { useEffect, useState } from 'react'

// Styled-components
import styled from 'styled-components/macro'

// Moment.js
import moment from 'moment'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles';

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

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

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

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
    <Container>
      <GameBar>
        {gameData &&
          <>
            <BetType><BetText>{betType}</BetText></BetType>
            {gameData.races.map(race => (
              <RaceButton key={race.id} onClick={(e) => handleClick(race.id)}>
                <ButtonText>{race.number}</ButtonText>
              </RaceButton>
            ))}
            <BetType></BetType>
          </>
        }
      </GameBar>

      <InfoArea>

        {race &&
          <>
            <RaceHeader>
              <Title> {title}</Title><div></div>
              <RaceGrid>
                <GridTitle>Number</GridTitle> <GridText>{race.number}</GridText>
                <GridTitle>Start time</GridTitle> <GridText>{moment(race.startTime).format("HH:MM")}</GridText>
                {race.name && <><GridTitle>Race</GridTitle> <GridText>{race.name}</GridText></>}

              </RaceGrid>
            </RaceHeader>

            {race.starts.map(start => (
              <React.Fragment key={start.number}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography component={'span'} className={classes.heading}>
                      <StartGrid>
                        <GridHeader>No.</GridHeader>
                        <GridHeader>Horse </GridHeader>
                        <GridHeader>Driver </GridHeader>
                        <div>{start.number}</div>
                        <div>{start.horse.name}</div>
                        <div>{start.driver.firstName} {start.driver.lastName} </div>
                      </StartGrid>
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography component={'span'}>
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
    </Container>
  )
}
const Title = styled.h3`
  box-sizing: border-box;
  text-align: center;
  margin: 0px;
  padding-top: 20px;
  padding-bottom: 0px;
  color: #ffdd00;
  font-size: 30px;
  font-style: italic;
`
const StartGrid = styled.div`
  margin-left: 0px;
  display: grid;
  grid-template-columns: 25px 120px auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  @media (min-width: 600px) {
    margin-left: 13px;
    grid-template-columns: 80px 220px auto;
  }
`
const RaceHeader = styled.div`
  background: #094897;
`
const RaceGrid = styled.div`
  font-size: 1em;
  color: white;
  margin: 0px 0px 0px 10px;
  padding: 15px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  @media (min-width: 600px) {
    font-size: 1.2em;
  }
`
const GridTitle = styled.div`
  font-weight: bold;
  text-align: left;
`
const GridText = styled.div`
`
const GridHeader = styled.div`
  margin: 0px;
  padding: 0px;
  font-size: 0.7em;
  color: darkgray;
  font-weight: bold;
`
const InfoArea = styled.div`
  box-sizing: border-box;
`
const Container = styled.div`
  box-sizing: border-box;
  width: 95%;
  -webkit-box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  -moz-box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  @media (min-width: 600px) {
    width: 650px;
  }
`
const GameBar = styled.div`
  border-radius: 10px 10px 0px 0px;
  background: #094897;
  height: 45px;
  justify-content: flex-start;
  display: grid;
  grid-template-columns: 65px repeat(7, 1fr) 25px;
  border-bottom: 1px solid gray;
  && button:first-of-type{
    border-left: 1px solid gray;
  }
  @media (min-width: 600px) {
    height: 70px;
    grid-template-columns: 110px repeat(7, 1fr) 25px;
  }
`
const BetType = styled.div`
  padding: 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;

`
const BetText = styled.span`
  color: #ffdd00;
  font-weight: bold;
  font-size: 25px;
  @media (min-width: 600px) {
    font-size: 40px;
  }
`

const ButtonText = styled.span`
  color: white;
  font-size: 18px;
  transform: skew(30deg);
`

const RaceButton = styled.button`
  outline: none;
  border: 0px;
  border-right: 1px gray solid;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #094897;
  transform: skew(-30deg);
  && :hover{
    background: #0b5dc1;
    cursor: pointer;
    border-bottom: #ffdd00 3px solid; 
  }
  && :focus{
    background: #0b5dc1;
    border-bottom: #ffdd00 3px solid; 
    transition-duration: 250ms;
  }
`