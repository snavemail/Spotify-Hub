import React, { useEffect, useState } from 'react'
import {
  getProfile,
  logout,
  getTopItems,
  getSavedTracks,
  getSavedTracksByDate,
} from '../spotify'
import Loader from './Loader'
import { AxiosResponse } from 'axios'
import { styled } from 'styled-components'
import { Main, mixins, theme } from '../styles'

const HomeWrapper = styled(Main)`
  ${mixins.flexCenter}
  flex-direction: column
`

const DisplayName = styled.h1`
  margin-top: 30px;
  font-size: ${theme.fontSizes.xxl};
`

const LogoutButton = styled.button`
  background-color: ${theme.colors.spotifyGreen};
  color: ${theme.colors.white};
  padding-left: ${theme.spacing.base};
  padding-right: ${theme.spacing.base};
  margin-top: 20px;
`

export const AvatarWrapper = styled.div`
  width: 150px;
  height: 150px;
  img {
    border-radius: 100%;
  }
`

export default function Home({ token }: { token: string }) {
  const [user, setUser] = useState<AxiosResponse<any, any> | null>(null)
  const [savedTracks, setSavedTracks] = useState<
    { added_at: string; track: any }[] | null
  >(null)
  const [month, setMonth] = useState<number>(9)
  const [year, setYear] = useState<number>(2023)

  useEffect(() => {
    const getMyProfile = async () => {
      const myUser = await getProfile()
      setUser(myUser)
    }

    const getMySavedTracks = async () => {
      const tracks = await getSavedTracksByDate(month, year)
      setSavedTracks(tracks)
    }

    getMySavedTracks()
    getMyProfile()
  }, [month, year])

  return (
    <HomeWrapper>
      {user ? (
        <>
          <AvatarWrapper>
            <img
              src={
                user.data.images[1] ? user.data.images[1].url : user.data.images[0].url
              }
              alt={`profile pic for ${user.data.display_name}`}
            />
          </AvatarWrapper>
          <DisplayName>{user.data.display_name}</DisplayName>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
          <p>{savedTracks ? savedTracks.length : 'loading will be here'}</p>
        </>
      ) : (
        <Loader />
      )}
    </HomeWrapper>
  )
}
