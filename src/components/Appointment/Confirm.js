import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

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

Confirm.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
