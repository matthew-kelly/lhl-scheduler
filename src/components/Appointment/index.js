import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import { useVisualMode } from '../../hooks/useVisualMode';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const CONFIRM = 'CONFIRM';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const newInterview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, newInterview)
      .then((res) => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  };

  const cancel = () => {
    transition(DELETING, true);
    cancelInterview(id)
      .then((res) => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  };

  useEffect(() => {
    if (interview && mode === EMPTY) transition(SHOW);
    if (interview === null && mode === SHOW) transition(EMPTY);
  }, [interview, transition, mode]);

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={cancel}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CREATE && (
        <Form interviewers={interviewers} onSave={save} onCancel={back} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          interviewer={interview.interviewer}
          name={interview.student}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Unable to save the appointment" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Unable to cancel the appointment" onClose={back} />
      )}
    </article>
  );
}

Appointment.propTypes = {
  id: PropTypes.number,
  time: PropTypes.string,
  interview: PropTypes.object,
  interviewers: PropTypes.array,
  bookInterview: PropTypes.func,
  cancelInterview: PropTypes.func,
};
