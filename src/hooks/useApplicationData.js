import { useState, useEffect } from 'react';
import axios from 'axios';

export function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

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

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
