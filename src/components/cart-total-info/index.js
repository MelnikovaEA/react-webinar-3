import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartTotalInfo({ sum = 0, qty = 0 }) {
  return qty ? (
    <div className="CartTotalInfo">
      <span className="CartTotalInfo-text">Итого</span>
      <span className="CartTotalInfo-data">{`${sum.toLocaleString()}\u00A0₽`}</span>
    </div>
  ) : (
    <div className="CartTotalInfo-empty">В корзине ничего нет</div>
  );
}

CartTotalInfo.propTypes = {
  sum: PropTypes.number,
  qty: PropTypes.number,
};

export default React.memo(CartTotalInfo);
