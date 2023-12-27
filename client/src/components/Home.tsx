import { useEffect, useState } from 'react'
import { getProfile, getSavedTracksByDate } from '../spotify'
import { styled } from 'styled-components'
import { media, theme } from '../styles'
import Loader from './Loader'
import { LikedTrackInterface, UserInterface } from '../types'
import User from './User'
import LikedSong from './LikedSong'

const Container = styled.div`
  display: flex;
  height: 100vh;

  ${media.lgtablet`
  flex-direction: column;
`};
`

const Navbar = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  margin: 8px 0px 8px 8px;
  border-radius: 19px;
  gap: 8px;

  .playlist {
    height: 500px;
  }

  ${media.lgtablet`
  margin: 8px 8px 0px 8px;
  width: calc(100vw - 16px);
`};
`

const NavbarContentTop = styled.div`
  overflow-y: auto;
  background-color: ${theme.colors.darkGrey};
  border-radius: 19px;
  ${media.lgtablet`
  overflow-y: visible;
`};
`

const NavbarContentBottom = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: ${theme.colors.darkGrey};
  border-radius: 19px;
  ${media.lgtablet`
  flex: unset;
  minHeight: 500px;
`};
`

const LeftNavbar = ({ user }: { user: UserInterface | null }) => {
  return (
    <Navbar>
      <NavbarContentTop>{user ? <User user={user} /> : <Loader />}</NavbarContentTop>
      <NavbarContentBottom className="playlist">{<Loader />}</NavbarContentBottom>
    </Navbar>
  )
}

const Content = styled.div`
  flex: 1;
  padding: 8px;
  overflow-y: auto;
  margin: 8px;
  background-color: ${theme.colors.darkGrey};
  border-radius: 19px;

  ${media.lgtablet`
  overflow-y: visible;
`};
`

const MainContent = () => {
  const [savedTracks, setSavedTracks] = useState<LikedTrackInterface[] | null>(null)
  const [month, setMonth] = useState<number>(12)
  const [year, setYear] = useState<number>(2023)

  useEffect(() => {
    const getMySavedTracks = async () => {
      const tracks = await getSavedTracksByDate(month, year)
      setSavedTracks(tracks)
    }

    getMySavedTracks()
  }, [month, year])

  return (
    <Content>
      <h1>Liked Songs</h1>
      {savedTracks ? (
        <div>
          <ol>
            {savedTracks.map((savedTrack, index) => (
              <LikedSong key={index} track={savedTrack.track} />
            ))}
          </ol>
        </div>
      ) : (
        <Loader />
      )}
    </Content>
  )
}

export default function Home() {
  const [user, setUser] = useState<UserInterface | null>(null)

  useEffect(() => {
    const getMyProfile = async () => {
      const myUser = await getProfile()
      setUser(myUser.data)
    }
    getMyProfile()
  }, [])

  return (
    <Container>
      <LeftNavbar user={user} />
      <MainContent />
    </Container>
  )
}
