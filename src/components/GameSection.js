import React, { useEffect, useState } from 'react'

// Styled-components
import styled from 'styled-components/macro'

// Material UI
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


// Components
import { GameInfo } from './GameInfo'

const gameOptions = [
  { value: 'V4', title: 'V4' },
  { value: 'V64', title: 'V64' },
  { value: 'V65', title: 'V65' },
  { value: 'V75', title: 'V75' },
]
export const GameSection = () => {

  const [search, setSearch] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    // Only fetch if search string is one of the 4 game types
    if (gameOptions.map(item => item.value === search).includes(true)) {
      fetch(`https://www.atg.se/services/racinginfo/v1/api/products/${search}`)
        .then((res) => res.json())
        .then((json) => {
          setData(json)
        })
    }
  }, [search])

  const handleInputChange = (e, value) => {
    setSearch(value)
  }

  return (
    <Container>

      <Autocomplete
        id="search-input"
        options={gameOptions}
        getOptionLabel={(option) => option.title}
        style={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
        onInputChange={handleInputChange}
      />

      {data &&
        <GameInfo data={data} />
      }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
`
