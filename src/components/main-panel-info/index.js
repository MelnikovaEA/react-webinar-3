import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';

import './style.css';

function MainPanelInfo({cart = {}}) {
  return (
    <span className="CartInfo">
      <span className='CartInfo-title'> В корзине:</span>
      <span className="CartInfo_bold">
        {' '}
        {!cart.qty
          ? 'пусто'
          : `${cart.qty} ${plural(cart.qty, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} /
          ${cart.sum.toLocaleString()}\u00A0₽`}{' '}
      </span>
    </span>
  );
}

MainPanelInfo.propTypes = {
  cart: PropTypes.object,
};

export default React.memo(MainPanelInfo);
