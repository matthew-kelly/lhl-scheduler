import React from 'react';
import PropTypes from 'prop-types';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const { day, days, setDay } = props;
  return (
    <ul>
      {days &&
        days.map((dayItem) => (
          <DayListItem
            key={dayItem.id}
            name={dayItem.name}
            spots={dayItem.spots}
            selected={dayItem.name === day}
            setDay={setDay}
          />
        ))}
    </ul>
  );
}

DayList.propTypes = {
  day: PropTypes.string.isRequired,
  days: PropTypes.array.isRequired,
  setDay: PropTypes.func.isRequired,
};
