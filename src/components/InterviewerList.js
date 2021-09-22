import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

export default function InterviewList(props) {
  const { interviewer, interviewers, setInterviewer } = props;
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
              selected={item.id === interviewer}
              setInterviewer={() => setInterviewer(item.id)}
            />
          ))}
      </ul>
    </section>
  );
}
