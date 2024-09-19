import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Controls from "../controls";
import MainPanelInfo from "../main-panel-info";

function MainPanel({ cart, onClick = () => {} }) {
  return (
    <div className="MainPanel">
      <MainPanelInfo cart={cart} />
      <Controls onClick={onClick} title="Перейти" />
    </div>
  );
}

MainPanel.propTypes = {
  onClick: PropTypes.func,
  cart: PropTypes.object,
};

export default React.memo(MainPanel);
