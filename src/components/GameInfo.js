import React, { useEffect, useState } from 'react'

// Styled-components
import styled from 'styled-components/macro'

export const GameInfo = ({ data }) => {

  console.log("data", data)
  return (
    <InfoContainer>
      Game results
    </InfoContainer>
  )
}


const InfoContainer = styled.div`

  display: flex;
  justify-content: center;
  background-color: lightsteelblue;
`

