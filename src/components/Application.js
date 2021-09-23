import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Application.scss';
import Appointment from './Appointment';
import DayList from './DayList';

const appointments = [
  {
    id: 1,
    time: '12pm',
  },
  {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
  {
    id: 3,
    time: '2pm',
  },
  {
    id: 4,
    time: '3pm',
    interview: {
      student: 'Brian Harpo',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
  {
    id: 5,
    time: '4pm',
    interview: {
      student: 'Jeff Shingle',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
];

export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/days`)
      .then((res) => {
        setDays(res.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map((appt) => (
          <Appointment key={appt.id} {...appt} />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
