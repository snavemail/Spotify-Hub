import React, { useState } from 'react'
import { Calendar } from './StyledCalendar'
import { Container } from './Styles'
import { MonthSelector } from './MonthSelector'

type ValuePiece = Date | null

export type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function CalendarView({
  setItem,
  setYear,
}: {
  setItem: any
  setYear: any
}) {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Value>(today)

  const handleClick = (date: Value) => {
    setItem(date)
    setYear(currentDate.getFullYear())
    setSelectedDate(date)
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
        ></div>
        <Calendar>
          <MonthSelector
            currentDate={currentDate}
            selectedDate={selectedDate}
            handleClick={handleClick}
          />
        </Calendar>
      </Container>
    </>
  )
}
// export default CalendarView
