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
