import styled from 'styled-components'
import { media, theme } from '../styles'
import { PlaylistInterface, UserInterface } from '../types'
import Loader from './Loader'
import User from './User'
import Playlist from './Playlist'
import { useState } from 'react'

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

  ${media.notebook`
  margin: 8px 8px 0px 8px;
  width: 300px;
`};

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
  overflow-x: hidden;
  background-color: ${theme.colors.darkGrey};
  border-radius: 19px;
  ${media.lgtablet`
  display: none;
`};
`

export const LeftNavbar = ({
  user,
  playlists,
}: {
  user: UserInterface | null
  playlists: PlaylistInterface[] | null
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <Navbar>
      <NavbarContentTop>{user ? <User user={user} /> : <Loader />}</NavbarContentTop>
      <NavbarContentBottom className="playlist">
        {loading ? (
          <Loader />
        ) : (
          playlists && (
            <div>
              <ol>
                {playlists.map((playlist, index) => (
                  <Playlist key={index} playlist={playlist} />
                ))}
              </ol>
            </div>
          )
        )}
      </NavbarContentBottom>
    </Navbar>
  )
}
