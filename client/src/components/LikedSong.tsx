import { useRef, useState } from 'react'
import { styled } from 'styled-components'
import { theme, mixins, media } from '../styles'
import { TrackInterface } from '../types'
import { formatMillis } from '../utils'
import IconPlay from '../icons/Play'
import IconPause from '../icons/Pause'
const { colors, fontSizes, spacing } = theme

const TrackLeft = styled.span`
  ${mixins.overflowEllipsis};
`
const TrackRight = styled.span``

const PlaySymbol = styled.button`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  svg {
    width: 25px;
  }
`

const TrackArtwork = styled.div`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: ${spacing.base};
  &:hover,
  &:focus {
    ${PlaySymbol} {
      opacity: 1;
    }
  }
`
const TrackContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-bottom: ${spacing.md};
  ${media.lgtablet`
    margin-bottom: 20px;
  `};
`
const TrackMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
`
const TrackName = styled.span`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`
const TrackAlbum = styled.div`
  ${mixins.overflowEllipsis};
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
  margin-top: 3px;
`
const TrackDuration = styled.span`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
`

const AudioPlayer = ({ audioSrc }: { audioSrc: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [icon, setIcon] = useState<JSX.Element>(IconPlay)

  const playAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play()
        setIcon(IconPause)
      } else {
        audioRef.current.pause()
        setIcon(IconPlay)
      }
    }
  }

  return (
    <div>
      <audio ref={audioRef} src={audioSrc} />
      <PlaySymbol onClick={playAudio}>{icon}</PlaySymbol>
    </div>
  )
}

const LikedSong = ({ track }: { track: TrackInterface }) => {
  return (
    <li>
      <TrackContainer>
        <div>
          <TrackArtwork>
            {track.album.images.length && (
              <img src={track.album.images[2].url} alt="Album Artwork" />
            )}
            <AudioPlayer audioSrc={track.preview_url} />
          </TrackArtwork>
        </div>
        <TrackMeta>
          <TrackLeft>
            <TrackName>{track.name}</TrackName>
            <TrackAlbum>
              {track.artists.map(({ name }, i) => (
                <span key={i}>
                  {name}
                  {track.artists.length > 0 && i === track.artists.length - 1
                    ? ''
                    : ','}
                  &nbsp;&#8226;&nbsp;
                </span>
              ))}
              {track.album.name}
            </TrackAlbum>
          </TrackLeft>
          <TrackRight>
            {track.duration_ms && (
              <TrackDuration>{formatMillis(track.duration_ms)}</TrackDuration>
            )}
          </TrackRight>
        </TrackMeta>
      </TrackContainer>
    </li>
  )
}

export default LikedSong
