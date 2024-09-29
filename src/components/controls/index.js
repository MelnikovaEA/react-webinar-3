import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ buttonTitle, onAdd = () => {} }) {
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{`${buttonTitle}: `}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  buttonTitle: PropTypes.string,
};

export default memo(Controls);
