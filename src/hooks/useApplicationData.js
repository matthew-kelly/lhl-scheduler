import { useEffect, useReducer } from 'react';
import axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

function updateSpots(days, appointments) {
  return days.map((day) => {
    const dayAppointments = day.appointments.map((appt) => appointments[appt]);
    const spots = dayAppointments.filter(
      (appt) => appt.interview === null
    ).length;
    return {
      ...day,
      spots,
    };
  });
}

export function useApplicationData() {
  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY: {
        return {
          ...state,
          day: action.day,
        };
      }
      case SET_APPLICATION_DATA: {
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };
      }
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview,
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment,
        };
        const newState = {
          ...state,
          appointments,
        };
        const days = updateSpots(newState.days, appointments);
        return {
          ...newState,
          days,
        };
      }
      default: {
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.onopen = (event) => {
      socket.send('ping');
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'SET_INTERVIEW') {
        dispatch(data);
      }
    };

    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ])
      .then((all) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        });
      })
      .catch((e) => console.error(e));
  }, []);

  const bookInterview = (id, interview) =>
    axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview,
      });
    });

  const cancelInterview = (id) =>
    axios.delete(`api/appointments/${id}`).then((res) => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null,
      });
    });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
