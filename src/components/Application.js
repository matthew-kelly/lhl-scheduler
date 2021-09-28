import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from 'helpers/selectors';

import Appointment from './Appointment';
import DayList from './DayList';

import './Application.scss';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios({
      method: 'put',
      url: `/api/appointments/${id}`,
      data: { interview },
    }).then((res) => {
      setState((prev) => ({
        ...prev,
        appointments,
      }));
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios({
      method: 'delete',
      url: `api/appointments/${id}`,
    }).then((res) => {
      setState((prev) => ({
        ...prev,
        appointments,
      }));
    });
  };

  const appointmentsForDay = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const schedule = appointmentsForDay.map((appointment, index) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
