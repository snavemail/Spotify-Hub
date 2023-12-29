import React, { useState } from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'
import { theme } from '../styles'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 8px;
  letter-spacing: -0.025em;
  margin: 0 0 10px;
  font-weight: 700;

  button {
    box-sizing: border-box;
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSizes.base};
    background-color: ${theme.colors.black};
    color: ${theme.colors.spotifyGreen};
    font-weight: 700;
    border-radius: 11px;
    border: 1px solid ${theme.colors.white};
    padding: 8px 19px;
    cursor: pointer;
    transition: ${theme.transition};

    &:hover,
    &:focus {
      color: ${theme.colors.offGreen};
      outline: 0;
    }
  }

  .arrow-button {
    font-size: 11px;
    padding: 0px 20px;
  }
`

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

const CalendarView = ({ setItem, setYear }: { setItem: any; setYear: any }) => {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Value>(today)
  const minYear = 2020
  const maxYear = new Date().getFullYear()

  const handleClick = (date: Value) => {
    setItem(date)
    setYear(currentDate.getFullYear())
    setSelectedDate(date)
  }

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth()))
  }

  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth()))
  }

  return (
    <>
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            height: 20,
          }}
        >
          <button
            className="arrow-button"
            onClick={handlePrevYear}
            disabled={currentDate.getFullYear() <= minYear}
            style={{
              borderRadius: 20,
              ...(currentDate.getFullYear() <= minYear && {
                backgroundColor: 'gray', // Set the background color for disabled state
                color: theme.colors.darkGrey, // Set the text color for disabled state
                cursor: 'not-allowed', // Change cursor for disabled state
              }),
            }}
          >
            &lt;
          </button>
          &nbsp;&nbsp;
          <div style={{ fontSize: 19, color: theme.colors.spotifyGreen }}>
            {currentDate.getFullYear()}
          </div>
          &nbsp;&nbsp;
          <button
            className="arrow-button"
            onClick={handleNextYear}
            disabled={currentDate.getFullYear() >= maxYear}
            style={{
              borderRadius: 20,
              ...(currentDate.getFullYear() >= maxYear && {
                backgroundColor: 'gray', // Set the background color for disabled state
                color: theme.colors.darkGrey, // Set the text color for disabled state
                cursor: 'not-allowed', // Change cursor for disabled state
              }),
            }}
          >
            &gt;
          </button>
        </div>{' '}
        <Calendar
          defaultView="month"
          onChange={handleClick}
          value={selectedDate}
          maxDetail="year"
          minDetail="month"
          maxDate={new Date()}
          minDate={new Date(2019, 0, 1)}
          showNavigation={false}
        />
      </Container>
    </>
  )
}

export default CalendarView
