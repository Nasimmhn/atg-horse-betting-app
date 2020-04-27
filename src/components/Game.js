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

        {race &&
          <>
            <RaceHeader>
              <Title> {title}</Title><div></div>
              <RaceGrid>
                <GridTitle>Number</GridTitle> <GridText>{race.number}</GridText>
                {race.name && <><GridTitle>Race</GridTitle> <GridText>{race.name}</GridText></>}
                <GridTitle>Start time</GridTitle> <GridText>{moment(race.startTime).format("HH:MM")}</GridText>
              </RaceGrid>
            </RaceHeader>


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
  display: grid;
  grid-template-columns: 50px 150px auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`

const RaceHeader = styled.div`
  height: 180px;
  border-radius: 5px 5px 0px 0px;
  background: #094897;
`

const RaceGrid = styled.div`
  color: white;
  padding: 15px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  grid-column-gap: 20px;
  grid-row-gap: 10px;
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
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75); 
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