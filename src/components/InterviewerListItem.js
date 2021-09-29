import classNames from 'classnames';
import React from 'react';
import './InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  const InterviewerListItemClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
  });
  return (
    <li
      className={InterviewerListItemClass}
      onClick={setInterviewer}
      data-testid="interviewer"
    >
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
