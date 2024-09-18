import React from 'react';
import PropTypes from 'prop-types';
//import './style.css';

function CartModal({ children }) {
  return (
    <div className="CartModal">
      <div>{children}</div>
    </div>
  );
}

CartModal.propTypes = {
  title: PropTypes.node,
};

export default React.memo(CartModal);
