import React from 'react'
import styled from 'styled-components'
import { theme } from '../../styles'
import { Month } from './StyledCalendar'
import { Value } from './Calendar'

export const MonthSelector = ({
  currentDate,
  selectedDate,
  handleClick,
}: {
  currentDate: Date
  selectedDate: Value
  handleClick: (date: Value) => void
}) => {
  return (
    <>
      {Array.from(Array(12).keys()).map((month) => {
        const date = new Date(currentDate.getFullYear(), month)
        const isSelected =
          selectedDate instanceof Date && date.getMonth() === selectedDate.getMonth()

        return (
          <Month
            key={month}
            onClick={() => handleClick(date)}
            style={{
              backgroundColor: isSelected
                ? theme.colors.spotifyGreen
                : theme.colors.black,
              color: isSelected ? theme.colors.black : theme.colors.spotifyGreen,
            }}
          >
            {date.toLocaleString('default', { month: 'short' })}
          </Month>
        )
      })}
    </>
  )
}
