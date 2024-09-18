import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Button from "../button";

function Item(props) {
  console.log(props.onClick);

  const callbacks = {
    onClick: () => {
      props.onClick(props.item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title} </div>
      <div className="Item-price">{`${props.item.price}\u00A0₽`} </div>
      <div className="Item-actions">
        <Button onClick={() => callbacks.onClick()} title={props.buttonTitle} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  buttonTitle: PropTypes.string,
};

Item.defaultProps = {
  onClick: () => {},
};

export default React.memo(Item);
