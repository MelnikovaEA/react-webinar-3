import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {numberFormat} from "../../utils";

function ItemDescription({ item, onClick }) {

  const callbacks = {
    onAdd: e => onClick(item._id),
  };

  return (
    <div className="ItemDescription">
      <div className="ItemDescription-item ItemDescription-description">{item.description}</div>
      <div className="ItemDescription-item">
        <span>Страна производитель: </span>
        <span className="ItemDescription-info">{`${item.madeIn.title} (${item.madeIn.code})`}</span>
      </div>
      <div className="ItemDescription-item">
        <span>Категория: </span>
        <span className="ItemDescription-info">{`${item.category.title}`}</span>
      </div>
      <div className="ItemDescription-item">
        <span>Год выпуска: </span>
        <span className="ItemDescription-info">{`${item.edition}`}</span>
      </div>
      <div className="ItemDescription-item ItemDescription-price">
        <span>Цена: </span>
        <span className="ItemDescription-price-info">{numberFormat(item.price)} ₽</span>
      </div>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

ItemDescription.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
};

export default memo(ItemDescription);
