export function getAppointmentsForDay(state, day) {
  // get day appointment ids
  const selectedDay = state.days.find((item) => item.name === day);
  if (!selectedDay) return [];
  // get appointments
  const appointments = selectedDay.appointments.map(
    (appt) => state.appointments[appt]
  );
  return appointments;
}

export function getInterview(state, interview) {
  // replace interview.interviewer with info from state
  if (!interview) return null;
  const interviewer = state.interviewers[interview.interviewer];
  if (!interviewer) return null;
  return { ...interview, interviewer };
}
