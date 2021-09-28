import { useEffect, useReducer } from 'react';
import axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

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
        console.log(action);
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };
      }
      case SET_INTERVIEW: {
        return {
          ...state,
          appointments: action.appointments,
          days: action.days,
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

  function updateSpots(appointments) {
    return state.days.map((day) => {
      const dayAppointments = day.appointments.map(
        (appt) => appointments[appt]
      );
      const spots = dayAppointments.filter(
        (appt) => appt.interview === null
      ).length;
      return {
        ...day,
        spots,
      };
    });
  }

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
      dispatch({
        type: SET_INTERVIEW,
        appointments,
        days: updateSpots(appointments),
      });
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
      dispatch({
        type: SET_INTERVIEW,
        appointments,
        days: updateSpots(appointments),
      });
    });
  };

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
