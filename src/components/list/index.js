import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list = [], onClick = () => {}, buttonTitle, isCart = false }) {

  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item item={item} onClick={onClick} buttonTitle={buttonTitle} isCart={isCart} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      qty: PropTypes.number,
    }),
  ).isRequired,
  onClick: PropTypes.func,
  buttonTitle: PropTypes.string,
  isCart: PropTypes.bool,
};

export default React.memo(List);
