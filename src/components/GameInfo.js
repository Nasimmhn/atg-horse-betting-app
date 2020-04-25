import React, { useEffect, useState } from 'react'

// Styled-components
import styled from 'styled-components/macro'

const gameTypes = ["V75", "V65", "V64", "V4"]
export const GameInfo = () => {

  const [search, setSearch] = useState("")
  const [data, setData] = useState({})

  useEffect(() => {
    fetch(`https://www.atg.se/services/racinginfo/v1/api/products/${search}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json)
        console.log(json)
      })
  }, [search])

  const handleInput = (search) => {
    console.log("search", search)
    if (gameTypes.includes(search)) {
      setSearch(search)
    }
  }

  return (

    <StyledInput
      placeholder="Type V75, V65, V64, V4"
      type="text"
      onInput={(e) => handleInput(e.target.value)}
    />
  )
}


const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: lightpink;
`



const StyledInput = styled.input`
  width: 50%;
  font-size: 16px;
  padding: 0px 8px;
  outline: none;
  box-sizing:border-box;
  border-radius: 5px;
  height:65px;
  & :focus {
    box-shadow: 0 0 4px black;
    border: 1px solid black;
  }
`
