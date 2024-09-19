import React from 'react';
import './style.css';
import PropTypes from "prop-types";

function CartHeadWrapper({ children }) {
  return <div className="CartHeadWrapper">{children}</div>;
}

CartHeadWrapper.propTypes = {
  children: PropTypes.node,
};

export default React.memo(CartHeadWrapper);
