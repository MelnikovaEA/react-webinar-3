import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Controls from "../controls";
import CartInfo from "../cart-info";

function CartPanel(props) {
  console.log(props.cart, props.onClick);
  return (
    <div className="CartPanel">
      <CartInfo cart={props.cart} />
      <Controls onClick={props.onClick} title='Перейти' />
    </div>
  );
}

CartPanel.propTypes = {
  onClick: PropTypes.func,
  cart: PropTypes.object,
};

CartPanel.defaultProps = {
  onClick: () => {},
};

export default React.memo(CartPanel);
