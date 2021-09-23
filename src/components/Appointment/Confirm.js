import React from 'react';

import Button from 'components/Button';

export default function Confirm(props) {
  const { message, onConfirm, onCancel } = props;
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button type="button" onClick={onCancel} danger>
          Cancel
        </Button>
        <Button type="button" onClick={onConfirm} danger>
          Confirm
        </Button>
      </section>
    </main>
  );
}