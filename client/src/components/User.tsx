import React from 'react'
import styled from 'styled-components'
import { UserInterface } from '../types'
import { media, theme } from '../styles'
import { logout } from '../spotify'

const LogoutButton = styled.button`
  background-color: transparent;
  color: ${theme.colors.white};
  padding-left: ${theme.spacing.base};
  padding-right: ${theme.spacing.base};
  margin-top: 20px;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 30px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
  }

  ${media.notebook`
  padding-left: 10px;
  padding-right: 10px;
`};

  ${media.lgphone`
  flex-direction: column;
  margin-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
`};
`

const SpotifyButton = styled.button`
  background-color: ${theme.colors.spotifyGreen};
  color: ${theme.colors.white};
  padding-left: ${theme.spacing.base};
  padding-right: ${theme.spacing.base};
  margin-top: 20px;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 30px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${theme.colors.offGreen};
  }

  ${media.notebook`
  padding-left: 10px;
  padding-right: 10px;
`};

  ${media.lgphone`
  flex-direction: column;
  margin-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
`};
`

const AvatarWrapper = styled.div`
  width: 88px;
  height: 88px;
  img {
    border-radius: 100%;
  }
`

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  gap: 16px;
  padding: 16px;
  width: 100%;

  ${media.lgtablet`
  width: 77%;
  `}

  ${media.lgphone`
  width: 100%;
  flex-direction: column;
  text-align: center;
`};
`

const ProfilePic = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`

const UserInfo = styled.div`
  display: flex;
  flex: 1;
  display: grid;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin: 0 auto;
`

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;

  ${media.lgphone`
  height: 30px;
`};
`

const UserDescription = styled.div`
  font-size: 14px;
  color: #666;

  ${media.lgphone`
  height: 30px;
`};
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  ${media.lgphone`
  flex-direction: column;
`};
`

const User = ({ user }: { user: UserInterface }) => {
  const openSpotify = () => {
    window.open(user.external_urls.spotify)
  }
  return (
    <CardContainer>
      <AvatarWrapper>
        <ProfilePic
          src={
            user.images[1]
              ? user.images[1].url
              : user.images[0]
                ? user.images[0].url
                : 'https://upload.wikimedia.org/wikipedia/en/1/1f/Pok%C3%A9mon_Charizard_art.png'
          }
          alt={`profile pic for ${user.display_name}`}
          loading={'lazy'}
        />
      </AvatarWrapper>

      <UserInfo>
        <UserName>{user.display_name}</UserName>
        <UserDescription>Followers: {user.followers.total}</UserDescription>
        <UserDescription>Playlists: 69</UserDescription>
        <ButtonRow>
          <SpotifyButton onClick={openSpotify}>Spotify</SpotifyButton>
          <LogoutButton onClick={logout}>Log out</LogoutButton>
        </ButtonRow>
      </UserInfo>
    </CardContainer>
  )
}

export default User
