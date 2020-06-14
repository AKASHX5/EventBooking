import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './App.css'
// import './main.scss' // webpack must be configured to do this

export default class EventCalendar extends React.Component {

  render() {
    return (
      <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]}
      events={[
        { title: 'event 1', date: '2020-06-01' },
        { title: 'event 2', date: '2020-06-02' }
      ]}
      />
    )
  }

}