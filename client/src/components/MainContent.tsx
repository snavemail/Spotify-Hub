import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import IconCalendar from '../icons/Calendar'
import IconHeart from '../icons/Heart'
import { getSavedTracksByDate } from '../spotify'
import { theme, media } from '../styles'
import { LikedTrackInterface } from '../types'
import { formatDateMonthYear } from '../utils'
import CalendarView from './Calendar'
import LikedSong from './LikedSong'
import Loader from './Loader'

const Content = styled.div`
  flex: 1;
  padding: 0;
  overflow-y: auto;
  margin: 8px;
  background-color: ${theme.colors.darkGrey};
  border-radius: 19px;
  position: relative;

  ${media.lgtablet`
  overflow-y: visible;
`};
`

const Header = styled.h1`
  position: -webkit-sticky;
  position: sticky;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: ${theme.colors.darkGrey};
  border-radius: 0px;
  border-radius: 19px 19px 0 0; /* Match the border-radius of Content */
  padding: 8px 111px;
  font-size: 22px;

  ${media.desktop`
  padding: 8px 88px;
  `}

  ${media.notebook`
  padding: 8px 23px;
  `}

  ${media.lgtablet`
  padding: 8px 0px;
`};
`

export const MainContent = () => {
  const [savedTracks, setSavedTracks] = useState<LikedTrackInterface[] | null>(null)
  const [date, setDate] = useState<Date>(new Date())
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [loading, setLoading] = useState<boolean>(false)

  const handleSetDate = (newDate: Date) => {
    setDate(newDate)
  }

  const handleSetYear = (newYear: number) => {
    setYear(newYear)
  }

  useEffect(() => {
    const getMySavedTracks = async () => {
      try {
        setLoading(true)
        const tracks = await getSavedTracksByDate(date.getMonth() + 1, year)
        setSavedTracks(tracks)
      } finally {
        setLoading(false)
      }
    }
    getMySavedTracks()
  }, [date, year])

  return (
    <Content>
      <CalendarView setItem={handleSetDate} setYear={handleSetYear} />
      <Header>
        <div style={{ flexDirection: 'row' }}>
          <IconHeart
            color={theme.colors.spotifyGreen}
            borderColor={theme.colors.black}
            borderWidth={1}
            size={26}
          />
          Songs: &nbsp;{loading ? <>&#8734;</> : `${savedTracks?.length}`}
        </div>

        <div>
          <IconCalendar
            size={26}
            borderWidth={1}
            borderColor={theme.colors.spotifyGreen}
            color={theme.colors.black}
          />
          &nbsp;
          {`${formatDateMonthYear(date, year)}`}
        </div>
      </Header>
      {loading ? (
        <Loader />
      ) : (
        savedTracks && (
          <div>
            <ol>
              {savedTracks.map((savedTrack, index) => (
                <LikedSong key={index} track={savedTrack} />
              ))}
            </ol>
          </div>
        )
      )}
    </Content>
  )
}
