import { useRef, useState } from 'react'
import { styled } from 'styled-components'
import { theme, mixins, media } from '../styles'
import { LikedTrackInterface } from '../types'
import { formatDate, formatMillis } from '../utils'
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
  padding-left: 8px;
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
const TrackName = styled.a`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  text-decoration: none;
  color-inherit: parent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`
const TrackData = styled.div`
  ${mixins.overflowEllipsis};
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
  margin-top: 3px;
`

const TypeElement = styled.span`
  user-select: none;
  border: 0;
  margin: 0;
  padding: 0;
  vertical-align: baseline;
  align-items: center;
  display: inline-flex;
  gap: 0 4px;
  justify-content: center;
  font-size: 1rem;
  font-weight: 400;
  font-family: var(
    --font-family,
    CircularSp,
    CircularSp-Arab,
    CircularSp-Hebr,
    CircularSp-Cyrl,
    CircularSp-Grek,
    CircularSp-Deva,
    var(--fallback-fonts, sans-serif)
  );
  color: var(--text-subdued, #6a6a6a);
`

const TrackExplicit = styled.span`
  display: inline-block;
  background-color: #888;
  color: #fff;
  padding: 3px 5px;
  border-radius: 4px;
  font-weight: bold;
  font-size: var(--encore-graphic-size-decorative-base, 9px);
`

const TrackDuration = styled.span`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
  padding-right: 8px;
`

const TrackAddedAt = styled.span`
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

export default function LikedSong({ track }: { track: LikedTrackInterface }) {
  return (
    <li style={{ paddingLeft: 8, paddingRight: 8 }}>
      <TrackContainer>
        <div>
          <TrackArtwork>
            {track.track.album.images.length && (
              <img src={track.track.album.images[2].url} alt="Album Artwork" />
            )}
            <AudioPlayer audioSrc={track.track.preview_url} />
          </TrackArtwork>
        </div>
        <TrackMeta>
          <TrackLeft>
            <TrackName href={track.track.external_urls.spotify} target="_blank">
              {track.track.name}
            </TrackName>
            <TrackData>
              {track.track.explicit ? (
                <>
                  <TypeElement
                    className="Type__TypeElement-sc-goli3j-0 cSfdnZ sQcIERaiZKFhOM1LrSmX"
                    data-encore-id="type"
                  >
                    <TrackExplicit aria-label="Explicit" title="Explicit">
                      E
                    </TrackExplicit>
                  </TypeElement>
                  &nbsp;&nbsp;
                </>
              ) : (
                <></>
              )}
              <span style={{ fontSize: 14 }}>
                {track.track.artists.map(({ name }) => name).join(', ')}
              </span>
              &nbsp;&#8226;&nbsp;{track.track.album.name}
            </TrackData>
          </TrackLeft>
          <TrackRight>
            <span style={{ display: 'inline-block' }}>
              {track.added_at && (
                <TrackAddedAt>{formatDate(track.added_at)}</TrackAddedAt>
              )}
              &nbsp; &nbsp;
              {track.track.duration_ms && (
                <TrackDuration>{formatMillis(track.track.duration_ms)}</TrackDuration>
              )}
            </span>
          </TrackRight>
        </TrackMeta>
      </TrackContainer>
    </li>
  )
}
