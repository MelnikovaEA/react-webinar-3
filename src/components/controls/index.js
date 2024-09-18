import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Button from "../button";

function Controls({ onClick, title }) {
  return (
    <div className="Controls">
      <Button onClick={() => onClick()} title={title} />
    </div>
  );
}

Controls.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
};

Controls.defaultProps = {
  onClick: () => {},
  title: '',
};

export default React.memo(Controls);
