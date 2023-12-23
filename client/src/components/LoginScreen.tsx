import styled from 'styled-components'
import { theme, mixins, Main } from '../styles'
import IconSpotify from '../icons/Spotify'
const { colors, fontSizes } = theme

const Login = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
`

const LoginPageHeader = styled.h1`
  font-size: ${fontSizes.xxxl};
`

const LogoWrapper = styled.div`
  color: ${colors.green};
  margin-top: 30px;
  padding-bottom: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 111px;
  height: 111px;
  align-items: center;
  transition: ${theme.transition};
  ${`768
    display: none;
  `};
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
  svg {
    width: 88px;
  }
`

const LoginButton = styled.button`
  display: inline-block;
  background-color: ${colors.green};
  color: ${colors.white};
  border-radius: 45px;
  padding: 26px 52px;
  margin: 20px 0px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.offGreen};
  }
  font-size: ${fontSizes.base};
`

export default function LoginScreen() {
  const handleLogin = async () => {
    window.location.href = 'http://localhost:8888/login'
  }

  return (
    <Login>
      <LogoWrapper>
        <IconSpotify />
      </LogoWrapper>
      <LoginPageHeader>Spotify Hub</LoginPageHeader>
      <LoginButton onClick={handleLogin}>Log in with Spotify</LoginButton>
    </Login>
  )
}
