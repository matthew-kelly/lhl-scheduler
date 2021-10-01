export const SET_DAY = 'SET_DAY';
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
export const SET_INTERVIEW = 'SET_INTERVIEW';

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

export default function reducer(state, action) {
  switch (action.type) {
    // case SET_DAY: {
    //   return {
    //     ...state,
    //     day: action.day,
    //   };
    // }
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
