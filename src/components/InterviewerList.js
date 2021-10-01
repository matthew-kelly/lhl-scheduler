import React from 'react';
import PropTypes from 'prop-types';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

function InterviewList(props) {
  const { interviewers, value, onChange } = props;
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers &&
          interviewers.map((item) => (
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

InterviewList.propTypes = {
  interviewers: PropTypes.array,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default InterviewList;
