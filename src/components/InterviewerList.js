import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

export default function InterviewList(props) {
  const { value, values, onChange } = props;
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {values &&
          values.map((item) => (
            <InterviewerListItem
              key={item.id}
              name={item.name}
              avatar={item.avatar}
              selected={item.id === value}
              setInterviewer={() => onChange(item.id)}
            />
          ))}
      </ul>
    </section>
  );
}
