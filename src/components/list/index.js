import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ list = [], onClick = () => {}, buttonTitle, component }) {
  const Component = component;

  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Component item={item} onClick={onClick} buttonTitle={buttonTitle} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  buttonTitle: PropTypes.string,
};

export default React.memo(List);
