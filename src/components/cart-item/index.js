import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';

function CartItem({ item, onClick = () => {}, buttonTitle}) {

  const callbacks = {
    onClick: () => {
      onClick(item.code);
    },
  };

  return (
    <div className={'CartItem'}>
      <div className="CartItem-code">{item.code}</div>
      <div className="CartItem-title">{item.title} </div>
      <div className="CartItem-price">{`${item.price.toLocaleString()}\u00A0₽`} </div>
      <div className="CartItem-quantity">{`${item.qty}\u00A0шт`} </div>
      <div className="CartItem-actions">
        <Button onClick={() => callbacks.onClick()} title={buttonTitle} />
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    qty: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
  buttonTitle: PropTypes.string,
};

export default React.memo(CartItem);
