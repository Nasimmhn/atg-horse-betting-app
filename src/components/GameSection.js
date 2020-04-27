import React, { useEffect, useState } from 'react'

// Styled-components
import styled from 'styled-components/macro'

// Material UI
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// Components
import { Game } from './Game'

const gameOptions = [
  { value: 'V4', title: 'V4' },
  { value: 'V64', title: 'V64' },
  { value: 'V65', title: 'V65' },
  { value: 'V75', title: 'V75' }
]

const getGame = (data) => {
  // Return upcoming games array if exists and is not empty, else return results
  if (data.upcoming && data.upcoming.length !== 0) {
    return { game: data.upcoming[0], gameTitle: 'Upcoming games' }
  } else {
    return { game: data.results[0], gameTitle: 'Latest results' }
  }
}

export const GameSection = () => {
  const [betType, setBetType] = useState(null)
  const [search, setSearch] = useState('V75')
  const [title, setTitle] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    // Only fetch if search string is one of the 4 game types
    if (gameOptions.map((item) => item.value === search).includes(true)) {
      fetch(`https://www.atg.se/services/racinginfo/v1/api/products/${search}`)
        .then((res) => res.json())
        .then((json) => {
          setBetType(json.betType)
          const { game, gameTitle } = getGame(json)
          setData(game)
          setTitle(gameTitle)
        })
    }
  }, [search])

  const handleInputChange = (e, value) => {
    setSearch(value)
  }

  return (
    <Section>
      <SearchBar>
        <Autocomplete
          id="search-input"
          options={gameOptions}
          getOptionLabel={(option) => option.title}
          style={{
            width: 200,
            margin: '0px auto',
            background: 'white'
          }}
          renderInput={(params) => <TextField {...params} label="Search" variant="filled" />}
          onInputChange={handleInputChange} />
      </SearchBar>
      {data && <Game title={title} betType={betType} gameId={data.id} />}
    </Section>
  )
}

const SearchBar = styled.div`
  background: #094897;
  padding: 20px 0px 20px 0px;
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  align-items: flex-start;
`
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
