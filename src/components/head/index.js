import {memo, useCallback} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, switcher, onClick }) {

  return (
    <div className="Head">
      <h1>{title}</h1>
      <button onClick={onClick}>{switcher}</button>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  switcher: PropTypes.string,
};

export default memo(Head);
