import React, { useEffect, useState } from 'react'

// Styled-components
import styled from 'styled-components/macro'

export const Input = () => {
  return (
    <InputWrapper>
      <StyledInput
        placeholder="Search a game type..."
        type="text"
      />
    </InputWrapper>
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
