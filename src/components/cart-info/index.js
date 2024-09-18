import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';

import './style.css';

function CartInfo(props) {
  console.log('CartInfo rerender');
  return (
    <span className="CartInfo">
      В корзине:
      <span className="CartInfo_bold">
        {' '}
        {!props.cart.qty
          ? 'пусто'
          : `${props.cart.qty} ${plural(props.cart.qty, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} /
          ${props.cart.sum}  ₽`}{' '}
      </span>
    </span>
  );
}

CartInfo.propTypes = {
  cart: PropTypes.object,
};

CartInfo.defaultProps = {
  cart: PropTypes.object,
};

export default React.memo(CartInfo);
