import React from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

export default function DatePicker (props) {
  return (
    <DayPicker
      onDayClick={day => {
        props.onDatePropSelect(day)
      }}
    />
  )
}
