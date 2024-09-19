import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';

function Item({ item, onClick = () => {}, buttonTitle, isCart }) {

  const callbacks = {
    onClick: () => {
      onClick(item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title} </div>
      <div className="Item-price">{`${item.price.toLocaleString()}\u00A0₽`} </div>
      {isCart && <div className="Item-quantity">{`${item.qty}\u00A0шт`} </div>}
      <div className="Item-actions">
        <Button onClick={() => callbacks.onClick()} title={buttonTitle} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    qty: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
  buttonTitle: PropTypes.string,
  isCart: PropTypes.bool,
};

export default React.memo(Item);
