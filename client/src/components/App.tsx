import React, { useState, useEffect } from 'react'
import Home from './Home'
import LoginScreen from './LoginScreen'
import styled from 'styled-components'
import { token } from '../spotify'
import { GlobalStyle } from '../styles'

const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`

function App() {
  const [accessToken, setAccessToken] = useState<string | null>('')

  useEffect(() => {
    setAccessToken(token)
    window.location.hash = ''
  }, [])

  return (
    <AppContainer>
      <GlobalStyle />
      {accessToken ? <Home /> : <LoginScreen />}
    </AppContainer>
  )
}

export default App
