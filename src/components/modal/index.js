import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({isOpen = false, children}) {
  return (
    <>
      {isOpen && (
        <div className="Modal">
          <div className="Modal-content">{children}</div>
        </div>
      )}
    </>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
};

export default React.memo(Modal);
