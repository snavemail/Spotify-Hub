import styled from 'styled-components';
import { theme, mixins, Main, media } from '../styles';
import IconSpotify from '../icons/Spotify';
const { colors, fontSizes } = theme;

const Login = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
`;

const LoginPageHeader = styled.h1`
  font-size: ${fontSizes.xxl};
`;

const LogoWrapper = styled.div`
  color: ${colors.spotifyGreen};
  margin-top: 30px;
  padding-bottom: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 111px;
  height: 111px;
  align-items: center;
  transition: ${theme.transition};
  ${`${media.lgtablet}
    display: none;
  `};
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
  svg {
    width: 88px;
  }
`;

const LoginButton = styled.button`
  display: inline-block;
  background-color: ${colors.spotifyGreen};
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
`;

const Subheader = styled.h2`
  font-size: ${fontSizes.xl};
  margin: 20px 0;
`;

export default function LoginScreen() {
  const handleLogin = async () => {
    window.location.href = 'http://localhost:8888/login';
  };

  return (
    <Login>
      <LogoWrapper>
        <IconSpotify />
      </LogoWrapper>
      <LoginPageHeader>Welcome To Spotify Hub</LoginPageHeader>
      <Subheader>Create playlists, listen to your favorite songs, and discover new ones</Subheader>
      <LoginButton onClick={handleLogin}>Connect with Spotify</LoginButton>
    </Login>
  );
}
