import React, { useState } from 'react';

import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
  const {
    name: existingName,
    interviewers,
    interviewer: existingInterviewer,
    onSave,
    onCancel,
  } = props;
  const [name, setName] = useState(existingName || '');
  const [interviewer, setInterviewer] = useState(
    existingInterviewer ? existingInterviewer.id : null
  );
  const [error, setError] = useState('');

  function reset() {
    setName('');
    setInterviewer(null);
  }

  function cancel() {
    reset();
    onCancel();
  }

  function validate() {
    if (name === '') {
      setError('Student name cannot be blank');
      return;
    }

    onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
