import { useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from 'reducers/application';

export function useApplicationData() {
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
