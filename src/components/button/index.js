import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Button({ onClick, title }) {
  return <button className='Button' onClick={() => onClick()}>{title}</button>
}

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  title: '',
};

export default React.memo(Button);
