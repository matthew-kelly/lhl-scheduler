import React from 'react';
import PropTypes from 'prop-types';

export default function Empty(props) {
  const { onAdd } = props;
  return (
    <main className="appointment__add" onClick={onAdd}>
      <img className="appointment__add-button" src="images/add.png" alt="Add" />
    </main>
  );
}

Empty.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
