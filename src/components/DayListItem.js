import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './DayListItem.scss';

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const DayListItemClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0,
  });

  function formatSpots(num) {
    if (num === 0) {
      return 'no spots remaining';
    }
    if (num === 1) {
      return '1 spot remaining';
    }
    return `${num} spots remaining`;
  }

  return (
    <li
      className={DayListItemClass}
      onClick={() => setDay(name)}
      data-testid="day"
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}

DayListItem.propTypes = {
  name: PropTypes.string,
  spots: PropTypes.number,
  selected: PropTypes.bool,
  setDay: PropTypes.func,
};
