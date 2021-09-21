import React from 'react';
import classNames from 'classnames';
import 'components/Application.scss';

export default function Button(props) {
  const { confirm, danger, onClick, disabled, children } = props;
  const buttonClass = classNames({
    button: true,
    'button--confirm': confirm,
    'button--danger': danger,
  });
  return (
    <button
      type="button"
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
