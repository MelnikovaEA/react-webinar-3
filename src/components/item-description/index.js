import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {numberFormat} from "../../utils";

function ItemDescription({ item, onClick, category, country, dateOfIssue, price, buttonTitle }) {

  return (
    <div className="ItemDescription">
      <div className="ItemDescription-item ItemDescription-description">{item.description}</div>
      <div className="ItemDescription-item">
        <span>{`${country}: `}</span>
        <span className="ItemDescription-info">{`${item.madeIn.title} (${item.madeIn.code})`}</span>
      </div>
      <div className="ItemDescription-item">
        <span>{`${category}: `}</span>
        <span className="ItemDescription-info">{`${item.category.title}`}</span>
      </div>
      <div className="ItemDescription-item">
        <span>{`${dateOfIssue}: `}</span>
        <span className="ItemDescription-info">{`${item.edition}`}</span>
      </div>
      <div className="ItemDescription-item ItemDescription-price">
        <span>{`${price}: `}</span>
        <span className="ItemDescription-price-info">{numberFormat(item.price)} ₽</span>
      </div>
      <button onClick={() => onClick(item._id)}>{buttonTitle}</button>
    </div>
  );
}

ItemDescription.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
  category: PropTypes.string,
  country: PropTypes.string,
  dateOfIssue: PropTypes.string,
  price: PropTypes.string,
  buttonTitle: PropTypes.string,
};

export default memo(ItemDescription);
