import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Button.scss';

export default function Button(props) {
  const { confirm, danger, onClick, disabled, children } = props;
  const buttonClass = classNames('button', {
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

Button.propTypes = {
  confirm: PropTypes.bool,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};
