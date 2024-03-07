import React from 'react'
import { PlaylistInterface } from '../types'
import { styled } from 'styled-components'

const PlaylistContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 8px;
`

const ImageContainer = styled.img`
  width: 69px;
  height: 69px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const NameContainer = styled.div``

const InfoContainer = styled.div``

export default function Playlist({ playlist }: { playlist: PlaylistInterface }) {
  return (
    <PlaylistContainer>
      {playlist.images.length && <ImageContainer src={playlist.images[0].url} />}
      <TextContainer>
        <NameContainer>{playlist.name}</NameContainer>
        <InfoContainer>{`${playlist.owner.display_name} -> ${playlist.tracks.total}`}</InfoContainer>
      </TextContainer>
    </PlaylistContainer>
  )
}
